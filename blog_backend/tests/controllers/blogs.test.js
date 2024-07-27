const {test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const app = require('../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../../models/blog')
const testHelper = require('../test_helper')

const api = supertest(app)

beforeEach(async ()=> {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlog)
})

describe('testing blog api', () => {

    test('test fetch blogs api', async () => {
        const result = await api.get('/api/blogs/')
            .expect(200)
            .expect('content-type', /application\/json/)
        
        assert.strictEqual(result.body.length, testHelper.initialBlog.length)
    })
    
    test('test the id field of the blog', async () => {
        const result = await api.get('/api/blogs')
        const blogsInDb = await testHelper.blogsInDb()
        assert.strictEqual(result.body[0].id, blogsInDb[0].id)
    })

    test('test fetching specific id', async () => {
        const blogsInDb = await testHelper.blogsInDb()
        const blog = await api.get(`/api/blogs/${blogsInDb[0].id}`)
        assert.deepStrictEqual(blog.body, blogsInDb[0])
    })

    test('test fetching non existing id', async () => {
        const nonExistingId = await testHelper.nonExistingId()
        await api.get(`/api/blogs/${nonExistingId}`)
                        .expect(404)
    })

    test('test fetching malformed id', async () => {
        const id = '0'
        await api.get(`/api/blogs/${id}`)
                        .expect(400)
    })

    test('test adding new blog', async () => {
        const blog = {
            title : 'example blog 3',
            author: 'dheeraj',
            url : 'https://examplelog3.com',
            likes: 3
        }

        await api.post('/api/blogs')
            .send(blog)
            .expect(201)

        const blogsInDb = await testHelper.blogsInDb()
        assert.strictEqual(blogsInDb.length, testHelper.initialBlog.length + 1)
    })

    test('test adding new blog with no likes default to 0', async () => {
        const blog = {
            title : 'example blog 3',
            author: 'dheeraj',
            url : 'https://examplelog3.com'
        }

        const result = await api.post('/api/blogs')
            .send(blog)
            .expect(201)

        const blogsInDb = await testHelper.blogsInDb()
        assert.strictEqual(blogsInDb.length, testHelper.initialBlog.length + 1)
        assert.strictEqual(result.body.likes, 0)
    })

    test('test adding new blog without required properties', async () => {
        const blog = {
            title : 'example blog 3',
            author: 'dheeraj',
        }

        await api.post('/api/blogs')
            .send(blog)
            .expect(400)
    })

})

after(async () => {
    await mongoose.connection.close()
})