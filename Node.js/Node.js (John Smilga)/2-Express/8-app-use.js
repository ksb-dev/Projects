const express = require('express')
const app = express()
const logger = require('./logger')

// request --> middleware --> response

// app.get('/', logger, (req, res) => {
//   res.send('Home Page')
// })

// app.get('/about', logger, (req, res) => {
//   res.send('About Page')
// })

//app.use(logger) // use this to avoid writing middleware name in every route & this should be written top of every route

app.use('/api', logger) // this is only applicable to the routes that starts with /api

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.get('/api/products', (req, res) => {
  res.send('Products Page')
})

app.get('/api/contact', (req, res) => {
  res.send('Contact Page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
