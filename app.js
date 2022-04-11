const express = require("express");
const app = express();
const server = require("http").createServer(app);

const content = require("./content/cards.json");
const { Server, Socket } = require("socket.io");
const io = new Server(server);

const Users = require("./services/users");
const Messages = require("./services/messages");
// Middlewares

app.use(express.static("public"));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index", { content });
});
app.delete("/message", (req, res) => {
  Messages.deleteMessage();
  res.send("Messages deleted");
  io.emit('delete message',"--")
});
app.get("/message", (req, res) => {
  res.send({ messages: Messages.getMessage() });
});

io.on("connection", (socket) => {
  const User = Users.getUser();
  if (User.length == 0) {
    socket.username = "User" + (User.length + 1);
    socket.idUser = User.length + 1;
  } else {
    let r = User.length - 1;
    socket.username = "User" + (User[r].id + 1);
    socket.idUser = User[r].id + 1;
  }
  socket.emit("user", socket.username);
  Users.addUser({ id: socket.idUser, name: socket.username });
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    Users.deleteUser(socket.idUser);
    // console.log(Users.getUser());
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    Messages.addMessage({ user: socket.username, messages: msg });
    console.log(Messages.getMessage());
  });
  socket.on("delete message", (msg) => {
    // console.log("---",msg)
    io.emit("delete message", msg);
  });
});
// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
