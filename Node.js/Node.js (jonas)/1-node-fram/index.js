// Core Modules
const fs = require('fs')
const http = require('http')
const url = require('url')

// 3rd Party Modules
const slugify = require('slugify')

// Own Modules
const replaceTemplate = require('./modules/replaceTemplate')

/*--------------------------------------------------------------- */

// 1. Reading & Writing Files

// Blocking / Synchronous

/*const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textInput)

const textOutput = `This is what we know about avocado: ${textInput}.\n Created on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', textOutput)*/

// Non-Blocking / Asynchronous

/*fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  //console.log(data1)
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    //console.log(data2)
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      //console.log(data3)
      fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', err => {
        console.log('Your file has been written😉')
      })
    })
  })
})
console.log('Will read file')*/

/*--------------------------------------------------------------- */

// 2. Creating simple web server

const templateOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
)
const templateProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8'
)
const templateCard = fs.readFileSync('./templates/template-card.html', 'utf-8')

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const productData = JSON.parse(data)

const slugs = productData.map(product =>
  slugify(product.productName, { lower: true })
)

//console.log(slugs)

const server = http.createServer((req, res) => {
  //console.log(req)
  //console.log(req.url)
  //console.log(url.parse(req.url, true))

  const { query, pathname } = url.parse(req.url, true)

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const cardsHtml = productData
      .map(product => replaceTemplate(templateCard, product))
      .join('')

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    res.end(output)
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const product = productData[query.id]
    const output = replaceTemplate(templateProduct, product)

    res.end(output)
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)
    //res.end('API')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>Page not found!</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Sever is listening to request on port 8000')
})

// "nodemon": "^2.0.15"
// * --> Update accept all versions
// ~ --> Update accept only patch releases
// ^ --> Update accept only minor & patch releaese
// 2 --> Major Version (Huge or breaking changes)
// 0 --> Minor Version (Some new feauture)
// 15 --> Patch Version (Bug Fixes)
