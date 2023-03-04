// Core Modules
const fs = require('fs')

// Installed Modules
const express = require('express')
const morgan = require('morgan')

// Initialize Express
const app = express()

// Routers
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// Middlewares
app.use(express.json())
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.static(`${__dirname}/public`))

// Routes (Middlewares)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
