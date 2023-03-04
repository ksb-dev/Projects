const express = require('express')
const app = express()
const { products } = require('./data')

app.get('/api/v1/query', (req, res) => {
  //console.log(req.query)
  // http://localhost:5000/api/v1/query?search=albany&limit=1

  const { search, limit } = req.query

  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter(product => {
      return product.name.startsWith(search)
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  if (sortedProducts.length < 1) {
    //res.status(200).send('No product matched your search')
    return res.status(200).json({ success: true, data: [] })
  }

  res.status(200).send(sortedProducts)
})

/*
;[
  {
    id: 1,
    name: 'albany sofa',
    image:
      'https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg',
    price: 39.95,
    desc:
      "I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian."
  }
]

*/

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
