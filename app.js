const express = require("express");
const app = express();
const server = require("http").createServer(app);

const content = require("./content/cards.json");
const { Server } = require("socket.io");
const io = new Server(server);
// Middlewares

app.use(express.static("public"));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index", { content });
});
io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
