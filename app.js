const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
    console.log(data);
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

const port = process.env.PORT || 3007
;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});