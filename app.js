// BASE SETUP
// =================================================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
	cors = require('cors');

var port = process.env.PORT || 5500;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/med-sr');

app.set('view engine', 'html');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/app/public'));


// ROUTERS
// =================================================

// error handling
app.use(function (err, req, res, next) {
    console.log(req.body);
    res.status(err.status || 500);
});

var routes = require('./app/router')(app);

app.listen(port);
console.log('Up and running at port: ' + port);

app.get('/', function(request, response){
    response.sendFile('index.html');
});

module.exports = app;