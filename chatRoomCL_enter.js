$(function () {

  // socket.ioの処理開始
  var socket = io.connect();

  // 入室
  socket.on('enter', function (data) {
    $('#thread').prepend(data + 'さんが入室しました。<br>');
  });

});
