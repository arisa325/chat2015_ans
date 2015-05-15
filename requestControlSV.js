var fs = require('fs');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
var paths = process.cwd().split(path.sep);
var settings = require(path.join(path.sep, paths[1], paths[2], paths[3], 'setting.js'));

console.log(settings);

var server = http.createServer(onRequest);
module.exports.server = server;

var query;

function onRequest(req, res) {
	console.log('------- onRequest -------');

	// パラメータを取得してページ表示
	if (req.method == 'GET') {
		console.log('GET!!');
	  query = url.parse(req.url, true).query;
	  showPage(req, res);

	} else {
	
		console.log('POST!!');
	  var query = setQeuryString(req, res);

	}
}

server.listen(settings.port);

function setQeuryString(req, res) {
	var postData = '';
	req.on("readable", function () {
		postData += req.read();
	});
	req.on("end", function() {
		query = querystring.parse(postData)
		showPage(req, res);
	});
}

function showPage(req, res) {
	console.log('Path = ' + req.url);
	module.exports.query = query;

	switch (req.url) {
		// ログイン画面を開く
		case '/':
			data = fs.readFileSync('./loginCL.html');  // 相対パス指定時は実行ディレクトリからの相対パスとなる
			res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
			res.end(data);
			break;

		// チャットルームを開く
		case '/room':
			require('./chatSV.js');
			ejsData = fs.readFileSync('./chatRoomCL.ejs', 'UTF-8');
			data = ejs.render(ejsData, {userName : query.userName});
			res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
			res.end(data);
			break;

		default:
			if (req.url.indexOf('/chat') >= 0) {
				data = fs.readFileSync('.' + req.url);  // 相対パス指定時は実行ディレクトリからの相対パスとなる
				res.writeHead(200, {'Content-Type': 'text/javascript; charset=UTF-8'});
				res.end(data);
			} else {
				console.log('File ' + req.url + ' is not found!!');
				return;
			}
			break;
	}
}
