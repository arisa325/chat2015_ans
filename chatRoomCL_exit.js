$(function () {

  // 退室ボタン押下
  $('#exit').on('click', function() {
    socket.emit('exit', $('#userName').val());
    location.href = '/';
  });

  // socket.ioの処理開始
  var socket = io.connect();

  // 退室
  socket.on('exit', function (data) {
    $('#thread').prepend(data + 'さんが退室しました。<br>');
  });
});
