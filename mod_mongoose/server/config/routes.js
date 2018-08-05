var showanimals = require("../controllers/showanimals.js");

module.exports = function(app) {
    app.get("/", function(req, res) {
        showanimals.show(req, res);
    });

    app.get("/mongooses/new", function(req, res){
        showanimals.newanimalform(req, res);
    });

    app.get("/mongooses/:id", function(req, res) {
        showanimals.showSingleAnimal(req, res);

    });

    app.get("/mongooses/:id/edit", function(req, res) {
        showanimals.updateSingleAnimal(req, res);
    });

    app.post("/mongooses", function(req, res) {
        showanimals.addanimal(req, res);
    });

    app.post("/mongooses/:id", function(req, res) {
        showanimals.executeUpdateAnimal(req, res);
    });

    app.get("/mongooses/:id/destroy", function(req, res) {

        showanimals.deleteAnimal(req, res);

    });

}