var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: true} ));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.use(express.static(path.join(__dirname + "/client/static")));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.listen(8000, function() {
    console.log("Listening on 8000");
});