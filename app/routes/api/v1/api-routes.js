/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

var express = require('express');
var HardwareModel = require('../../../models/hardware-inventory.js');
var helperFunctions = require('../../../helpers/helpers-mongoose.js');
var moment = require('moment');
var _  = require('underscore');

var app = module.exports = express();

app.get('/api/v1/hardware-inventory-list', function(req, res){
    helperFunctions.getHardwareInventoryList().then(function(hardwareList){
        res.json(hardwareList);
    });
});

app.get('/api/v1/hardware-details/:id', function(req, res){
    HardwareModel.find( { _id: req.params.id }, function(err, hardwareDetails){
        if(err) {
            res.send({status: 404});
        }else {
            res.json(hardwareDetails);
        }
    });
});

app.post('/api/v1/create-new-hardware', function(req, res){
    helperFunctions.createNewHardware(req.body, function(status){
        if(status) {
            res.send({status: 200});
        }else {
            res.send({status: 404});
        }
    });
});

app.put('/api/v1/edit-hardware/:id', function(req, res){
    helperFunctions.editHardwareDetails(req.params.id, req.body, function(status) {
        if(!status) {
            res.send( {status: 404} );
        }else {
            res.send( {status: 200} );
        }
    });
});

app.post('/api/v1/delete-hardware/:id', function(req, res){
    helperFunctions.deleteHardware(req.params.id, function(operationResult){
        if(operationResult != 200) {
            res.send({ status: operationResult });
        }else  {
            res.send( { status: operationResult } );
        }
    });
});