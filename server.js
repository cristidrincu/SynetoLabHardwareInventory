/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

// set up ======================================================================
// get all the tools we need

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var busboy = require('connect-busboy');
var _ = require('underscore');
var moment = require('moment');

var mongoose = require('mongoose');

var morgan = require('morgan'); //logger
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var helperFunctions = require('./app/helpers/helpers-mongoose.js');

//use romanian locale for moment.js
moment.locale('ro');

//----------CONFIG-----------------------------
//connect to our database
mongoose.connect(configDB.url);

//setup our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //to support URL-encoded bodies, from forms
app.use(busboy());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/frontend-app')));

app.set('port', (process.env.PORT || 5000));

var defaultRoute = require('./app/routes/default/default-route');
var api = require('./app/routes/api/v1/api-routes');

app.use(defaultRoute);
app.use(api);

//launch
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});