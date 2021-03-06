var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var querystring = require("querystring");

var app = express();

app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});

var server = app.listen(8000, function() {
    console.log("Node.js is running on port 8000!");
});

var io = require("socket.io").listen(server);

var users = {};

io.sockets.on("connection", function(socket) {
    console.log("Sockets are running!");


    socket.on("new_user_from_client", function(data) {

        users[socket.id] = data.name;

        console.log(users);

        socket.emit("client_name", {name: data.name});
    });

    socket.on("message_text", function(data) {
        console.log(users[socket.id] + ": " + data.message);

        io.emit("server_message_text", {user_message: "<strong>" + users[socket.id] + "</strong>: " + data.message});

    });


});