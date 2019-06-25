var http = require('http')
var db = {
	name: 'admin',
	pass: 123456,
	token: 'xxxxxxxxx'
}

// 解析cookie
function parseCookies (request) {
	var list = {},
			rc = request.cookie

	rc && rc.split('').forEach(function( cookie ) {
			var parts = cookie.split('=')
			list[parts.shift().trim()] = decodeURI(parts.join('='))
	})

	return list
}

http.createServer((request, response) => {
	console.log(request.cookie)
	// 检查登陆状态
	console.log(request.url)
	if (request.url.indexOf('/checklogin') !== -1) {
		let cookie = parseCookies(request)
		if (cookie.token === db.token) {
			response.writeHead(200, {'Content-Type': 'text/plain'})
			response.end('jsonpCallback("{status: "logined"}")')
		} else {
			response.writeHead(200, {'Content-Type': 'text/html'})
			response.end('jsonpCallback("{status: unlogin}")')
			// response.writeHead(302, {'Location': 'http://www.b.com:8080/setCookie.html'})
			response.end()
		}
	}
	// 登陆
	if (request.url.indexOf('/login') !== -1) {
		// console.log(request.body)
		var body = ''
		response.on('data', (data)=> {
			req.on('data', function (chunk) {
        body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        console.log("chunk:",chunk);
    	})
		})
	}
}).listen(3000)
