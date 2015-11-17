/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

var express = require('express');
var app = module.exports = express();

app.get('/', function(req, res) {
    res.redirect('frontend-app/index.html');
});