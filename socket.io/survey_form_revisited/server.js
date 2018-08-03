var express = require("express");
var path = require("path");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var querystring = require("querystring");

app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/result", function(req, res) {

    res.redirect("/");
});

var server = app.listen(8000, function(){
    console.log("Node.js is listening to port 8000 test");
});

var io = require("socket.io").listen(server);

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var getRandNum = 0;

io.sockets.on("connection", function (socket) {

    console.log("Sockets are running!");

    socket.on("posting_form", function (client_data) {
        getRandNum = randomNumber(1, 1000);

        var parseFormData = querystring.parse(client_data.response);

        console.log(parseFormData);
        var name = parseFormData.name;
        var dojo_location = parseFormData.dojo_location;
        var fav_language = parseFormData.fav_language;
        var comment = parseFormData.comment;

        socket.emit("updated_message", {response: "<p>You have emitted the following information to the server:<br />{ name: " + name + ", location: " + dojo_location + ", fav_language: " + fav_language + ", comment: " + comment + " }</p><p>Your lucky number emitted by the server is:<br />" + getRandNum + "</p>"}
        );

    });
});