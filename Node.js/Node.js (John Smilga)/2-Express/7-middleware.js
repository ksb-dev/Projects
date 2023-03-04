const express = require('express')
const app = express()

// request --> middleware --> response

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()

  console.log(method, url, time)

  next() // if you don't write next() after middleware your page does,'t load
}

app.get('/', logger, (req, res) => {
  // const method = req.method
  // const url = req.url
  // const time = new Date().getFullYear()

  // console.log(method, url, time)

  res.send('Home Page')
})

app.get('/about', logger, (req, res) => {
  res.send('About Page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
