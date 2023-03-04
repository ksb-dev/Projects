const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')
const morgan = require('morgan')

// Middleware options
// 1. own --> app.use([logger, authorize])
// 2. express --> app.use(express.static('./public))
// 3. third party --> app.use(morgan('tiny'))

//app.use([logger, authorize]) // this is only applicable to the routes that starts with /api

// app.get('/', ;[logger, authorize], // It is valid middleware
// (req, res) => {
//   res.send('Home Page')
// })

app.use(morgan('tiny'))

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
  console.log(req.user)

  res.send('Contact Page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
