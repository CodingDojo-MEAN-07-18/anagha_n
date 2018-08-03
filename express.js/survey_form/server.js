var express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
var port = 8000;

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'somethingsecretdoesnotmatterwhatyouput',
    resave: false,
    saveUninitialized: true,
}))



app.get('/', (req, res) =>{
    return res.render('index')
})

app.get('/showuser', (req, res) =>{
    if(!req.session.name){
        return res.redirect('/');
    }
    if(!req.session.location){
        return res.redirect('/')
    }
    if(!req.session.language){
        return res.redirect('/')
    }
    if(!req.session.comment){
        return res.redirect('/')
    }
    else{
    var context = {
        session: req.session,
    }
    return res.render('showuser', context)
    }
})

app.post('/newuser', (req, res)  => {
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    console.log(req.body);
    return res.redirect('/showuser')
app.post('/goback', (req, res)  => {
    req.session.destroy();
    console.log(req.session);
    return res.redirect('/')
})






app.listen(port, ()=>  console.log(`Listening on port ${port}`));