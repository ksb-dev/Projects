const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  //throw new Error('Testing async errors')
  const search = 'ab'
  /*const products = await Product.find({
    //name: { $regex: search, $options: 'i' }
  }).sort('-name')*/

  /*const products = await Product.find({
    //name: { $regex: search, $options: 'i' }
  }).select('name price')*/

  /*const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(1)*/

  const products = await Product.find({ price: { $gt: 30 } })

  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  //console.log(req.query)
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  console.log(queryObject)
  //const products = await Product.find(queryObject)

  // sort

  let result = Product.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  // select

  if (fields) {
    const selectList = fields.split(',').join(' ')
    result = result.select(selectList)
  }

  // skip, limit

  const page = Number(req.query.page) || 1
  const limitProducts = Number(req.query.limit) || 10

  const skipProducts = (page - 1) * limitProducts

  result = result.skip(skipProducts).limit(limitProducts)

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '=': '$eq',
      '<=': '$lte'
    }
    const regEx = /\b(<|>|>=|<=|=)\b/g
    let filters = numericFilters.replace(regEx, match => {
      return `-${operatorMap[match]}-`
    })

    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })

    console.log(queryObject)

    console.log(filters)
  }

  let products = await result

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}
