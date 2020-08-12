var express = require('express');
var app = express();
var db = require('./db');

app.get('/', (req, res) => {
    res.send('GET request to the homepage, try with /users and /api/auth')
  })

var UserController = require('./controller/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;