var express = require("express");
var app = express();
app.get('/', function(request, response){
    response.send("Hello Express");
})

app.listen(6789, function(){
    console.log("Running on 6789");
})