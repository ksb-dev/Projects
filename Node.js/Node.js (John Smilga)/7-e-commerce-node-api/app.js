// To get access to .env variables
require('dotenv').config()

// To avoid using try/catch
require('express-async-errors')

// -----------------------------------------------------------------------------

// Express
const express = require('express')
const app = express()

// -----------------------------------------------------------------------------

//  Database
const connectDatabase = require('./db/connect')

// -----------------------------------------------------------------------------

// Routers
const authRouter = require('./routes/authRoutes')

// -----------------------------------------------------------------------------

// Middlewares

// Third party middlewares
const morgan = require('morgan') // Morgan is another HTTP request logger middleware for Node. js
const cookieParser = require('cookie-parser') // cookie-parser is a middleware which parses cookies attached to the client request object

// Custom middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// -----------------------------------------------------------------------------

app.use(morgan('tiny'))
app.use(express.json()) // express.json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res) => {
  res.send('TMDb Back End API')
})

app.get('/api/v1', (req, res) => {
  //console.log(req.cookies)
  console.log(req.signedCookies)
  res.send('TMDb Back End API')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// -----------------------------------------------------------------------------

// Port
const port = process.env.PORT || 5000

// Start Server
const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
