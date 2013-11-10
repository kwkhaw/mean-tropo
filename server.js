/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger')
    http = require('http');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

//express settings
require('./config/express')(app, passport);

//Bootstrap routes
require('./config/routes')(app, passport, auth, io);

//Start the app by listening on <port>
var port = config.port;

//app.listen(port); // Use http instead of app for socket.io.
server.listen(port);


console.log('Express app started on port ' + port);

//Initializing logger 
logger.init(app, passport, mongoose);

//expose app
exports = module.exports = app;
