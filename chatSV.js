var fs = require('fs');
var http = require('http');
var path = require('path');
var paths = process.cwd().split(path.sep);
var settings = require(path.join(path.sep, paths[1], paths[2], paths[3], 'setting.js'));

var server = require.main.exports.server;

var io = require('socket.io').listen(server);

// io.socketsの接続
io.sockets.on('connection', function (socket) {
	var query = require.main.exports.query;
	// 他ユーザに入室情報を送信
	socket.broadcast.emit('enter', query.userName);

	socket.on('msg', function (data) {
		io.sockets.emit('msg', data);
	});

	socket.on('exit', function (data) {
		// 他ユーザに退室情報を送信
		socket.broadcast.emit('exit', query.userName);
	});
});
