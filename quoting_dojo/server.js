var path = require("path");

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: true} ));

app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/quoting_dojo");

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    updated_at: {type: Date, default: Date.now}
});

var Quote = mongoose.model("Quote", QuoteSchema);

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/quotes", function(req, res) {

    console.log("POST DATA", req.body);

    var quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });

    quote.save(function(err) {
        if(err) {
            console.log("Quote not saved in MongoDB 'quoting_dojo' database.");
        }
        else {
            console.log("Successfully added a quote.");
            res.redirect("/");
        }
    });

});

app.get("/quotes", function(req, res) {
    Quote.find({}).exec(function(err, quotes) {
        if(err) {
            console.log("Error:", err);
        }
        else {
            res.render("quotes", {quotes: quotes});
        }
    });
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
});
