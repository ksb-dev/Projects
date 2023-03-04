const express = require('express')
const app = express()
const { products } = require('./data')

// app.get('/', (req, res) => {
//   res.status(200).json([{ name: 'Kedar' }, { name: 'John' }])
// })

app.get('/', (req, res) => {
  res.status(200).json(products)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
