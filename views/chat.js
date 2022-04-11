var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var deleteB = document.getElementById('delete')

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {"user":1, "message":input.value});
    input.value = '';
  }
});
deleteB.addEventListener('click', function (e) {
  e.preventDefault();
  socket.emit('delete message', input.value);

});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';

  socket.emit('disconnect', 1)
});
socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('delete message', function (msg) {
  messages.innerHTML = ""
})
socket.on('disconnect', function () {
  socket.disconnect();
});

socket.on('user', function (data) {
  document.getElementById('userName').innerHTML=data
})
