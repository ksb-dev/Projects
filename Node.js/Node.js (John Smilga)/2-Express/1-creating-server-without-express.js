const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  //res.writeHead(200, { 'content-type': 'text/html' })
  console.log(req.method)
  console.log(req.url)
  res.write('<h1>Welcome</h1>')
  res.end()
})

server.listen(5000)
