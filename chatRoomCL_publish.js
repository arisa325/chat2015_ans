$(function () {

  // 投稿ボタン押下
  $('#write').on('click', function() {
    socket.emit('msg', $('#userName').val() + 'さん：' + $('#msg').val());
    $('#msg').val('');
    return false;
  });

  // socket.ioの処理開始
  var socket = io.connect();

  // 投稿
  socket.on('msg', function (data) {
    $('#thread').prepend(data + '<br>');
  });
});
