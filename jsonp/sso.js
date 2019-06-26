// var http = require('http')
// var queryString = require("querystring")

var db = {
	name: 'admin',
	pass: '123456',
	token: 'xxxxxxxxx'
}

// // 解析cookie
// function parseCookies (request) {
// 	var list = {},
// 			rc = request.cookie

// 	rc && rc.split('').forEach(function( cookie ) {
// 			var parts = cookie.split('=')
// 			list[parts.shift().trim()] = decodeURI(parts.join('='))
// 	})

// 	return list
// }

// http.createServer((request, response) => {
// 	console.log(request.cookie)
// 	// 检查登陆状态
// 	console.log(request.url)
// 	if (request.url.indexOf('/checklogin') !== -1) {
// 		let cookie = parseCookies(request)
// 		if (cookie.token === db.token) {
// 			response.writeHead(200, {'Content-Type': 'text/plain'})
// 			response.end('jsonpCallback("{status: "logined"}")')
// 		} else {
// 			response.writeHead(200, {'Content-Type': 'text/html'})
// 			response.end('jsonpCallback("{status: unlogin}")')
// 			// response.writeHead(302, {'Location': 'http://www.b.com:8080/setCookie.html'})
// 			response.end()
// 		}
// 	}
// 	// 登陆
// 	if (request.url.indexOf('/login') !== -1) {
// 		// console.log(request.body)
// 		var obj = null
//     var currentData = ""
// 		request.on('data', function (chunk) {
// 			body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
// 			console.log("chunk:",chunk);
// 		})
// 		request.on("data",function(data){
// 				currentData += data;
// 				obj = queryString.parse(currentData);
// 		})
// 		console.log(obj);
// 		response.writeHead(200,{"ContentType":"text/html;charset=utf-8"});
// 		response.end();
// 	}
// }).listen(3000)
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/checklogin', function (req, res) {
	console.log(req.cookies)
	res.append('Content-Type', 'text/plain')
	if (req.cookies && req.cookies.token === db.token) {
		res.status(200).end('jsonpCallback({status: "logined"})')
	} else {
		res.status(200).end('jsonpCallback({status: "unlogin"})')
	}
})

app.get('/login.html', function(req, res) {
	res.sendFile(__dirname+'/login.html')
})

app.post('/login', function(req, res) {
	console.log(req.body)
	let parmas = req.body
	res.append('Content-Type', 'application/json')
	if (parmas.name === db.name && parmas.pass === db.pass) {
		res.cookie('token', db.token, { domain: 'www.sso.com', path: '/'})
		res.end(JSON.stringify({status:"success"}))
	} else {
		res.end(JSON.stringify({status:"fail"}))
	}
})

app.listen(3000)