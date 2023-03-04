const express = require('express')
const app = express()
const { products } = require('./data')

app.get('/', (req, res) => {
  res.status(200).send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
  const newProducts = products.map(product => {
    const { id, name, image } = product
    return { id, name, image }
  })
  res.json(newProducts)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const singleProduct = products.find(product => product.id === Number(id))

  if (!singleProduct) {
    res.status(404).send('Product doesn not exist')
  }
  res.json(singleProduct)
})

app.get('/api/products/:id/reviews/:reviewId', (req, res) => {
  // http://localhost:5000/api/products/3/reviews/abs
  console.log(req.params)
  res.send('Hello World')
})

//Server is listening on port 5000
//{ id: '3', reviewId: 'abs' }

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
