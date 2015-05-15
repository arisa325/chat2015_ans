$(function () {

  // メモボタン押下
  $('#memo').on('click', function() {
    memoString = $('#userName').val() + 'さんのメモ：' + $('#msg').val();
    $('#thread').prepend(memoString + '<br>');
    $('#msg').val('');
    return false;
  });
});
