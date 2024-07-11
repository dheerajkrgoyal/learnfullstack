# Full Stack Open Course

In earlier days, the page used to fully re-render after the request to the server.
Let's say we are displaying a list of notes returned from the server on a page. Firstly, a list of notes is fetched using AJAX. We have a form below the list of notes to add new notes. We define URL and action=POST in the form which dictates what will happen when we click on the submit button on the form.
Once the request is made to the server the note is added and the server sends a 302 response to the client asking it to re-render the page by calling homepage again to display the changes.

But now in modern days, We create SPA (Single Page Application) where we just simply send the request to add a new note to the server and the server sends 201 as response.
Clients do not have to re-render everything to show the changes.

We can write our client-side code using vanilla Javascript. However, the DOM manipulation is a bit difficult using vanilla Javascript. That is why we started to use JQuery earlier. Then the rise of SPA brought BackboneJS to popularity. Post that we started using AngularJS. But AngularJS released version 2 without backward compatibility with a prior version which led to its downfall. ReactJS started to become popular then. Now VueJS is also coming into the picture slowly.


### Create a project using vite.

```
npm create vite@latest sample_app -- --template react
cd sample_app
npm install
npm run dev
```

By default, we write react components using JSX which gets compiled to JavaScript using Babel.
In the React app, the web application frontend is composed of combining React components.
The react component is nothing but can be thought of as just a small module of HTML.
Indeed, a core philosophy of React is composing applications from many specialized reusable components.
Another strong convention is the idea of a root component called App at the top of the component tree of the application. 

props are used to pass the data between components.

```javascript
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' />
      <Hello name='Daisy' />
    </div>
  )
}
```

The first letter of React component names must be capitalized.
The content of a React component (usually) needs to contain one root element. If we, try to define the component App without the outermost div-element then it will throw an error. We can also return an array of components or wrap it using <> (empty) element if we do not want to wrap the components with a div element.

We cannot object directly inside the component. Instead, we need to use an array or point to the element.

### Error:
```javascript
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}

export default App
```

### Solution:

```javascript
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App
```

DO NOT USE var while defining variables in Javascript.
Use const for constants and let for variables.

### Array in Javascript: 
We define an array using const arr = [1, 2, 3]
Adding element in the array: arr.push(4). Although we have defined arr as constant. Variable arr is still pointing to same object, just that the object's content is changed. arr.push changes the same array. However, we can also use const arr1 = arr.concat(4) to preserve arr and return a new array with an added element.

Looping the array:

```javascript
arr.forEach(value => {
	console.log(value)
})
```

### Array map method:

```javascript
const t = arr.map(value => {
	'<li>' + value + '</li>'
})
```

### Destructuring Array:

```javascript
const [first, second, ...rest] = arr1
result:
first = 1
second = 2
rest = [3, 4]

//We can also destructure object likewise:

const obj = {
	name: 'Dheeraj',
	age: 28
}

const {name, age} = obj
```

Learn more about Javascript from here: https://fullstackopen.com/en/part1/java_script#java-script-materials

### Stateful Component:

To define state within the component we use state hook.

```javascript
import {useState} from 'react'

//inside the component
const [counter, setCounter] = useState(0)

//Changing state should always be done using new object rather than editing same object. For example:
const [obj, setObj] = useState({left: 0, right: 0})
//Correct way: 
setObj({..obj, left: obj.left + 1}) . 

//Here we are creating a new obj by copying the old object first then changing the left value of the new object.
//Incorrect way: 

obj.left++;
setObj({obj})
```

It seems to work but can lead to unusual behaviour. Therefore alway treat things as immutable.
	
Also we should keep in mind that when we call setObj(), it gets called asynchronously. the changes take effect before the component is rendered. but it is not synchronous operation.

```javascript
const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(left + right)
  }
```
  
Above in setTotal function, the left value is still old one even though we called setLeft before it because the setLeft operation is asynchronous and might not complete before setTotal is called with left.

When you use console.log for debugging, don't combine objects in a Java-like fashion by using the plus operator:

```javascript
console.log('props value is ' + props)

//If you do that, you will end up with a rather uninformative log message:

props value is [object Object]

//Instead, separate the things you want to log to the console with a comma:

console.log('props value is', props)
```

The application still appears to work, but never define components inside of other components.

If we want to make our componets dynamically. We can loop through data and keep on creating our component

```javascript
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}
```

Above, parts is an array, and we want to loop through array and create Part component. It is essential to have key attribute in the component
so that react identifies each component uniquely. Otherwise, React will throw error.

We can bind the state and input element together so that whatever we enter into input element is displayed and saved into that state.
in order to do so we need to define our input element in such a way:

```javascript
<input value={newName} onChange={handleNewName}/>
```

newName is the state and handleNewName is the event handler we need to define to set the newName whenever there is a change

```javascript
const handleNewName = (event) => {
  setNewName(event.target.value)
}
```

### Json-Server:

We can create a temporary server by installing json-server

```
npm install json-server --save-dev

create db.json in project root folder.
and start json-server using command:

npm json-server --port 3001 --watch db.json
```

json-server stores all the data in the db.json file, which resides on the server. 
In the real world, data would be stored in some kind of database

Watch interesting video: https://www.youtube.com/watch?v=8aGhZQkoFbQ to learn about async process in JS

### Axios:
We will be using the axios library instead for communication between the browser and server.
We can make a call to backend API using 

```javascript
var promise = axios.get("http://localhost:3001/server")
```

Axios operation returns Promise.
A Promise is an object representing the eventual completion or failure of an asynchronous operation. A promise can have three distinct states:
1. The promise is pending: It means that the final value (one of the following two) is not available yet.
2. The promise is fulfilled: It means that the operation has been completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.
3. The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

We can get the data inside promise in a following way:

```javascript
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

### Effect-hooks:

```javascript
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}
useEffect(hook, [])
```

The function useEffect takes two parameters. The first is a function, the effect itself. According to the documentation:

By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

### Applying CSS:

In regular HTML, classes are defined as the value of the class attribute.
In React we have to use the className attribute instead of the class attribute

### Backend Using NodeJS:

Now we will shift the focus to backend using NodeJS. We wont be creating project using vite in the backend. that was only for the frontend.
Instead we will creating project directly by creating folder and running npm init command in that folder.

The command will ask certain project related info and will create package.json and index.js file.

we can run the project using node index.js command or add this command in the script section of package.json and then running the project with npm start command

```
script: {
  start: node index.js
}
```

In index.js we can start simple http server using following code:

```javascript
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

Notice that we import modules in NodeJS usning require as opposed to import in frontend
It is because code that runs in the browser uses ES6 modules. Modules are defined with an export and included in the current file with an import

NodeJS uses CommonJS module. Node also support ES6 modules, but it hasn't matured yet.

### Express:

"express": "^4.18.2"
The caret in the front of ^4.18.2 means that if and when the dependencies of a project are updated, the version of Express that is installed will be at least 4.18.2.

```javascript
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### Nodemon:
Compared to the convenient workflow in React where the browser automatically reloaded after changes were made,
We need to use Nodemon to do Hot replacement.

```
npm install --save-dev nodemon

{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
npm run dev
```

Unlike with the start and test scripts, we also have to add run to the command because it is a non-native script.

### Get data from server

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

To accept the data in server we need to activate json-parser of express. It is called middleware.

```javascript
const express = require('express')
const app = express()

app.use(express.json())
```

In practice, you can use several middlewares at the same time. When you have more than one, they're executed one by one 
in the order that they were listed in the application code.

We can implement our own middleware as well.
Middleware is just a function that accepts 3 parameters (request, response, next)

```javascript
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

At the end of the function body, the next function that was passed as a parameter is called. The next function yields
control to the next middleware.

```javascript
app.use(requestLogger)
```

Middleware functions have to used before routes when we want them to be executed by route event handler.
Sometimes, we want to use middleware functions after routes. We do this when the middleware functions are only called if no route handler processes the HTTP request.

### Logging in express

```javascript
npm install morgan for logging
const morgan = require("morgan")
app.use(morgan('tiny'))

//or we want to use our custom configuration
morgan.token('request-body', (request, response)=>{
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
```

### Build and Deply:

In order to run the frontend code we execute

```
npm run build
```

It will create dist folder which contains minified versions of javascript and index file. These are minified because it is optimised for production.

We have two parts in our application. backend and frontend. We need to copy the dist folder from the frontend to backend folder so that our backend server can also serve the frontend.

In node js we need to add static middleware so that it can serve frontend static files.

```javascript
app.use(express.static('dist'))
```

Now our backend will serve both frontend and backend logic.
However copying dist folder fron the frontend to backend folder maually is cumbersome task.
So we can automate it slightly using the script in package.json of backend

```json
"scripts": {
    "build-ui": "rm -rf dist && cd ../phonebook && npm run build && cp -r dist ../phonebook_backend",
    "deploy-full": "npm run build-ui && git add . && git commit -m uibuild && git push"
  }
```

The above script exposes command deploy-full which will run the build of frontend. copy the dist folder to backend and commit and push the backend changes to git repository.
Now our PAAS platform (render in this case) will detech commit and redeploy the changes.

```
npm run deploy-full
```

### MongoDB and Mongoose

We will use MongoDB to store our document. 
We can go to mongodb atlas and create free cluster.

We will install mongoose in the backend. It provides us higher level functions to interact with mongodb.

```
npm intall mongoose
```

### Creating connection and basics of Mongoose

```javascript
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

After establishing the connection to the DB, we define schema for the collection and the matching model for document.

```javascript
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```
Mongodb is schemaless, meaning the DB doesn't care about the structure of the document.
But why are we defining schema then? 
The idea is at the level of application w.r.t Mongoose things are consistent.

### Creating and saving object

Next, we create the a new note object with the help of Note model:

```javascript
const note = new Note({
  content: 'HTML is Easy',
  important: false,
})
```

Models are construction functions that create new JS object based on the parameters provided. They have all the functions to interact with the DB.

```javascript
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

When the object is saved successfully, the event handler in then() gets called. The event handler will closes the database connection in this case.

### Fetching objects from the MongoDB

```javascript
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

### Using dotenv to manage credential

We can pass arguments while runnning the file with node. But we can also use something called dotenv to manage our credentials separately in a file and accessing them in JS file.

```
node install dotenv
```

Create .env file in project root directory. Remember to add it in .gitignore so that you dont commit it and expose your credentials

In .env file add following content:

```
MONGODB_URL="mongodb+srv://fullstack:password@db.gwcmebp.mongodb.net/?retryWrites=true&w=majority&appName=db"
```

In index.js file simply access it using

```javascript
require('dotenv').config()
const mongoUrl = process.env.MONGODB_URL
```

### Transform document before returning
We need to overrride toJSon tranform method in the schema:

```javascript
personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
```

### Error Handling

Instead of defining catch function and returning response everywhere we can define global function which is supposed to handle error. It can be done be defining custom middleware.

```javascript
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => next(error))
})
```

Above we defined a next function and passing the error to the next middleware.
Express error handlers are middleware that are defined with a function that accepts four parameters. Our error handler looks like this:

```javascript
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```

### Data Validation in Mongoose

Instead of validating the objects manually in each route. We can leverage validation functions in Mongoose.
We can define validation rule for each field in the schema:

```javascript
const noteSchema = new mongoose.Schema({

  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})
```

he Mongoose custom validator functionality allows us to create new validators if none of the built-in ones cover our needs.

### Lint
Lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

In JS, we use ESlint to do analysis

```
npm install eslint @eslint/js --save-dev
```

We initialize default configuration of eslint

```
npx eslint --init
```

![alt text](eslint.png)

The configuration will be saved in the generated eslint.config.mjs file

```javascript
// ...
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
  },
]
```

ESLint configuration file defines the files option with ["*/.js"], which tells ESLint to look at all JavaScript files in our project folder.  
We want to make use of ESLint's recommended settings along with our own. The @eslint/js package we installed earlier provides us with predefined configurations for ESLint. We'll import it and enable it in the configuration file:

```javascript
// ...
import js from '@eslint/js'
// ...

export default [
  js.configs.recommended, // hightlight-line
  {
    // ...
  }
]
```

We've added the js.configs.recommended to the top of the configuration array, this ensures that ESLint's recommended settings are applied first before our own custom options.

Let's continue building the configuration file. Install a plugin that defines a set of code style-related rules:

```
npm install --save-dev @stylistic/eslint-plugin-js
```

Import and enable the plugin, and add these four code style rules:

```javascript
// ...
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    // ...
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },
]
```

Add lint command in package.json script

```javascript
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...

    "lint": "eslint ."
  },
  // ...
}
```

Files in the dist directory also get checked when the command is run. We do not want this to happen, and we can accomplish this by adding an object with the ignores property that specifies an array of directories and files we want to ignore.

```javascript
// ...
export default [
  // ...
  { 
    ignores: ["dist/**"],
  },
  //...
]
```

Some more rules:

```javascript
import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
    },
  },
  { 
    ignores: ["dist/**", "build/**"],
  },
]
```
Recommended rules: 
https://github.com/airbnb/javascript 
https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

### NodeJS Best Practice and Refactor

Separate things in its own module
Example:

Create utils/logger.js

```javascript
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}
```

Handling of environment variable and configs in one place:

```javascript
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```
The other parts of application can access the configs in the following way:

```javascript
const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)
```

The index.js shouldn't have so much code. Instead we should create separate app.js file to have express related config there and index.js should just import app.js and start the server.

```javascript
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

Even the route handler should be in their individual files controllers.
and We use this route handle just like middleware in our app.js

```javascript
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

The router we defined earlier is used if the URL of the request starts with /api/notes. For this reason, the notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter /:id.

For smaller applications, the structure does not matter that much. Once the application starts to grow in size, you are going to have to establish some kind of structure and separate the different responsibilities of the application into separate modules. This will make developing the application much easier.

