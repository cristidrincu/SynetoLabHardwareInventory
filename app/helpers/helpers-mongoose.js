/**
 * Created by cristiandrincu on 7/6/15.
 */
'use strict';

var LabHardwareInventory = require('./../models/hardware-inventory.js');
var _ = require('underscore');
var Q = require('q');
var moment = require('moment');

exports.getHardwareInventoryList = function(){
    var deferred = Q.defer();

    LabHardwareInventory.find({}).sort({ name: 1 }).exec(function(err, hardwareInventory){
        if(err) {
            deferred.reject(err);
        }

        deferred.resolve(hardwareInventory);
    });

    return deferred.promise;
};

exports.getHardwareDetails = function(hardwareId, cb) {
//    var status = false;
//    LabHardwareInventory.findById( { _id: hardwareId }).exec(function(err, hardwareDetails) {
//        if(err) {
//            cb(status);
//        }else {
//            cb(hardwareDetails);
//        }
//    });
//
};

exports.createNewHardware = function(hardwareData, cb){
    var status = false;
    LabHardwareInventory.create({
        name: hardwareData.name,
        hostname: hardwareData.hostname,
        location: hardwareData.location,
        serialNumber: hardwareData.serialNumber,
        physicalDimension: hardwareData.physicalDimension,
        cpu: hardwareData.cpu,
        memory: hardwareData.memory,
        diskDrives: hardwareData.diskDrives,
        ssdCapacityGB: hardwareData.ssdCapacityGB,
        storageCapacityTB: hardwareData.storageCapacityTB,
        jbodConnections: hardwareData.jbodConnections,
        mbpsPortsCards10100: hardwareData.mbpsPortsCards10100,
        netPortCards1Gbbps: hardwareData.netPortCards1Gbbps,
        netPortCards10Gbps: hardwareData.netPortCards10Gbps,
        fcPortCards: hardwareData.fcPortCards,
        managementIp: hardwareData.managementIp,
        ipmiIp: hardwareData.ipmiIp,
        os: hardwareData.os
    }, function(err) {
        if(err) {
            cb(status)
        }else {
            status = true;
            cb(status);
        }
    });
};

exports.editHardwareDetails = function(hardwareId, hardwareData, cb){
    var status = false;
    LabHardwareInventory.findOne( { _id: hardwareId }, function(err, hardware){
        if(err) {
            cb(status);
        }else{
            hardware.name = hardwareData.name;
            hardware.hostname = hardwareData.hostname;
            hardware.location = hardwareData.location;
            hardware.serialNumber = hardwareData.serialNumber;
            hardware.physicalDimension = hardwareData.physicalDimension;
            hardware.cpu = hardwareData.cpu;
            hardware.memory = hardwareData.memory;
            hardware.diskDrives = hardwareData.diskDrives;
            hardware.ssdCapacityGB = hardwareData.ssdCapacityGB;
            hardware.storageCapacityTB = hardwareData.storageCapacityTB;
            hardware.jbodConnections = hardwareData.jbodConnections;
            hardware.mbpsPortsCards10100 = hardwareData.mbpsPortsCards10100;
            hardware.netPortCards1Gbbps = hardwareData.netPortCards1Gbbps;
            hardware.netPortCards10Gbbps = hardwareData.netPortCards10Gbps;
            hardware.fcPortCards = hardwareData.fcPortCards;
            hardware.managementIp = hardwareData.managementIp;
            hardware.ipmiIp = hardwareData.ipmiIp;
            hardware.os = hardwareData.os;

            hardware.save(function(err) {
                if(err) {
                    cb(status);
                }else {
                    status = true;
                    cb(status);
                }
            });
        }
    });
};

exports.deleteHardware = function(hardwareId, cb) {
    var operationResult = 200;
    LabHardwareInventory.remove({_id: hardwareId}, function(err, result){
        if(err) {
            operationResult = 404;
            cb(operationResult);
        }else if( result > 0 ) {
            cb(operationResult);
        }
    });
};

