var http = require('http')

http.createServer((request, response) => {
  console.log(12)
  response.writeHead(200, {'Access-Control-Allow-Origin': '*'})
  response.end('RESSS')
}).listen(3000)
// app.get('/', function (req, res) {
//   console.log(1)
//   res.append('Access-Control-Allow-Origin', '*')
//   res.end('res')
// })

// app.listen(3000)