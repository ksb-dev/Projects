const express = require('express')
const app = express()
const { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())

app.post('/login', (req, res) => {
  const { name } = req.body

  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

app.post('/api/people', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name' })
  }
  res.status(201).json({ success: true, person: name })
})

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
