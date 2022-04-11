const express = require("express");
const app = express();
const server = require("http").createServer(app);

const content = require("./content/cards.json");
const { Server } = require("socket.io");
const io = new Server(server);

const Users = require('./services/users')
// Middlewares

app.use(express.static("public"));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index", { content });
});
app.delete("/message", (req, res) => {
  res.send({})
});
app.get("/message", (req, res) => {
  console.log("--")
  res.send({"s":req.params})
});


io.on('connection', (socket) => {
  Users.Users.length ++
  socket.username= "User" +   Users.Users.length
  console.log('a user connected', Users.Users.length, io.engine.clientsCount,socket.id, socket.username);
  socket.emit('user',socket.username)
});

io.on('connection', (socket) => {


  socket.on("disconnect", () => {
    Users.Users.length= Users.Users.length -1
    console.log('a user disconnected', Users.Users.length,  io.engine.clientsCount);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('delete message', (msg) => {
    console.log("---",msg)
   io.emit('delete message', msg);
  });
});
// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
