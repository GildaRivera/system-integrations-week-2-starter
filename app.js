const express = require("express");
const app = express();
const server = require("http").createServer(app);

const content = require("./content/cards.json");
const { Server, Socket } = require("socket.io");
const io = new Server(server);

const Users = require("./services/users");
const Messages = require("./services/messages");

const swaggerUi= require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

// Middlewares
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use(express.static("public"));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index", { content });
});
app.delete("/message", (req, res) => {
  if (Messages.getMessage().length > 0) {
    Messages.deleteMessage();
    io.emit("delete message", "--");
    return res.status(200).send("Messages deleted");
  }
  return res.status(403).send("No messages to delete");
});
app.get("/message", (req, res) => {
  res.status(200).send({ messages: Messages.getMessage() });
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
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  socket.emit("user", {
    idUser: socket.idUser,
    username: socket.username,
    color: randomColor,
    id: socket.id,
    first: true,
  });
  Users.addUser({ id: socket.idUser, name: socket.username });
  console.log("New user connected, total connected: " + Users.getUser().length )
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    Users.deleteUser(socket.idUser);
    console.log("User disconnected, total connected: " + Users.getUser().length )
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    Messages.addMessage({ user: socket.username, messages: msg.message });
  });
  socket.on("delete message", (msg) => {
    io.emit("delete message", msg);
  });
  socket.on("user change", (msg) => {
    io.emit("user", msg);
  });
});
// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
