const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
	const sumLikes =  blogs.reduce((totalLikes, blog) => {
		return totalLikes + blog.likes
	}, 0)
	return sumLikes
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.length === 0 ? {} : blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog )
	return favorite
}

const mostBlogs = (blogs) => {
    const groupedBlog = blogs.reduce((groupedBlog, blog) => {
        groupedBlog[blog.author]  = groupedBlog[blog.author] + 1 || 1
        return groupedBlog
    }, {})

    const parsedBlog = []
    Object.entries(groupedBlog).map(entry => parsedBlog.push({'author': entry[0], 'blogs': entry[1]}))
    const mostBlog = parsedBlog.length == 0? {} : parsedBlog.reduce((max, blog) => max.blogs > blog.blogs?max:blog)

    return mostBlog
}

const mostLikes = (blogs) => {
    const groupedBlog = blogs.reduce((groupedBlog, blog) => {
        groupedBlog[blog.author]  = groupedBlog[blog.author] + blog.likes || blog.likes
        return groupedBlog
    }, {})

    const parsedBlog = []
    Object.entries(groupedBlog).map(entry => parsedBlog.push({'author': entry[0], 'likes': entry[1]}))
    const mostLikes = parsedBlog.length == 0? {} : parsedBlog.reduce((max, blog) => max.likes > blog.likes?max:blog)

    return mostLikes
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}