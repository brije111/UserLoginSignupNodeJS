var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./controller/UserController');
var DefaultController = require('./controller/DefaultController');
app.use('/users', UserController);
//app.use('/', DefaultController);

module.exports = app;