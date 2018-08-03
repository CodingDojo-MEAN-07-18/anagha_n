var express = require("express");
var app = express();
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname +"/views");
app.set('view engine', 'ejs');

app.get('/cars', function(request, response){
    response.render('cars');
});
app.get('/cats', function(request, response){
    response.render('cats');
});
app.get('/cars/new', function (request, response){
    response.render('new_car');
});

app.listen(6789, function(){
    console.log("Running on 6789");
});