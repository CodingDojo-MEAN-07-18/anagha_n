var mongoose = require("mongoose");
var AnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

var AddAnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

var UpdateAnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

mongoose.model("Animal", AnimalSchema);
mongoose.model("AddAnimal", AddAnimalSchema);
mongoose.model("UpdateAnimal", UpdateAnimalSchema);