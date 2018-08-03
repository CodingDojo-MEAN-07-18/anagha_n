var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/reset", function(req, res) {
    res.redirect("/");
});
var server = app.listen(8000, function() {
    console.log("Node.js is running on port 8000!");
});

var io = require("socket.io").listen(server);
var counter = 0;

io.sockets.on("connection", function(socket) {
    console.log("Sockets are running!");
    socket.on("client_count", function(action) {
        counter++;
        console.log(counter);
        io.emit("server_counter", {response: counter});
    });
    socket.on("client_reset_count", function(action) {
        counter = 0;
        io.emit("server_reset_count", {zero: counter});
    });

});