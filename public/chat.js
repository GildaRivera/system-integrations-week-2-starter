
  var dataUser = {}
  var socket = io();
  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  var deleteB = document.getElementById('delete')

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      let data = document.getElementById('userName').innerHTML
      socket.emit('chat message', { "user": data, "message": input.value });
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
    let head = document.createElement('h4');
    let mess = document.createElement('h6');
    mess.textContent = msg.message
    item.appendChild(head)
    item.appendChild(mess)
    //let message=document.createElement('p');
    if (msg.user == dataUser.username) {
      head.textContent = "You"
      head.style.color = `#${dataUser.color}`
      head.style.fontWeight = "bold"
      mess.style.position = "relative"
      mess.style.left = "2vw"
    }
    else {
      head.textContent = msg.user
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      head.style.color = "blue"
      head.style.fontWeight = "bold"
      mess.style.position = "relative"
      mess.style.left = "2vw"
    }
    // item.textContent = msg.message;
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
    if (data.first) {
      document.getElementById('userName').innerHTML = data.username
      dataUser = data
      dataUser.first = false
    }
    else {
      if (data.id == dataUser.id) {

        document.getElementById('userName').innerHTML = data.username
        dataUser = data
      }
    }

  })

  function changeName() {
    // Get the modal
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
    let input = document.getElementById('name').value
    if (input) {
      dataUser.username = input
      socket.emit('user change', { "idUser": dataUser.id, "username": input, "id": dataUser.id, "first": false, color:dataUser.color })
    }
  }

