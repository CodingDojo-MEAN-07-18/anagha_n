var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname + "/static")));

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/animals");

var AnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

var Animal = mongoose.model("Animal", AnimalSchema);

app.get("/", function(req, res) {
    Animal.find({}).exec(function(err, animals) {
        if(err) {
            console.log("Error:", err);
        }
        else {
            res.render("index", {animals: animals});
        }

    });

});

app.get("/mongooses/new", function(req, res){
    res.render("new");
});

app.get("/mongooses/:id", function(req, res) {
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        res.render("animal", {animal: animal});
    });
});

app.get("/mongooses/:id/edit", function(req, res) {
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        console.log("Edit an animal");

        res.render("editanimal", {animal: animal});
    });
});

app.post("/mongooses", function(req, res) {
    console.log("POST DATA", req.body);
    var animal = new Animal({
        name: req.body.name
    });
    animal.save(function(err) {
        if(err) {
            console.log("Animal not saved in database.")
        }
        else {
            console.log("Successfully updated animal.");
            res.redirect("/");
        }
    });

});

app.post("/mongooses/:id", function(req, res) {
    var animal = new Animal({
        name: req.body.name
    });
    Animal.update({_id: req.params.id}, {name: req.body.name}, function(err, animal) {
        res.redirect("/");
    });

});

app.get("/mongooses/:id/destroy", function(req, res) {
    Animal.remove({_id: req.params.id}, function(err, animal) {
        console.log("Animal deleted!");
        res.redirect("/");
    });

});
app.listen(8000, function() {
    console.log("Listening on 8000");
});