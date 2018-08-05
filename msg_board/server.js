var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dojo_message_board");

var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    created_at: {type: Date, default: new Date},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

var commentSchema = new mongoose.Schema({
    _message: {type: Schema.ObjectId, ref: "Message"},
    name: String,
    comment: String,
    created_at: {type: Date, default: new Date}
});
var Message = mongoose.model("Message", messageSchema);
var Comment = mongoose.model("Comment", commentSchema);

app.get("/", function(req, res) {
    Message.find({}).populate("comments").exec(function(err, messages) {
        if(err) {
            console.log("Error:", err);
        }
        else {
            messages.reverse();
            res.render("index", {messages: messages});
        }
    });
});

app.post("/messages", function(req, res) {
    console.log("Message Posted:", req.body);

    var message = new Message({
        name: req.body.name,
        message: req.body.message
    });

    message.save(function(err) {
        if(err) {
            console.log("Error:", err);
        }
        else {
            res.redirect("/");
        }

    });

});

app.post("/message/:id", function(req, res) {
    console.log("Comment Posted:", req.body);
    Message.findOne( {_id: req.params.id}, function(err, message) {
        var comment = new Comment(req.body);
        comment._message = message._id;
        message.comments.push(comment);
        comment.save(function(err) {
            message.save(function(err) {

                if(err) {
                    console.log("Comment Error", err);
                }
                else {
                    res.redirect("/");
                }

            });

        });

    });

});

app.listen(8000, function() {
    console.log("Listening on 8000");
});