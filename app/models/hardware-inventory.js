/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

var Mongoose = require('mongoose');

var HardwareInventorySchema = Mongoose.Schema({
    name: String,
    hostname: String,
    location: String,
    serialNumber: String,
    physicalDimension: String,
    cpu: String,
    memory: String,
    diskDrives: String,
    ssdCapacityGB: String,
    storageCapacityTB: String,
    jbodConnections: String,
    mbpsPortsCards10100: String,
    netPortCards1Gbbps: String,
    netPortCards10Gbps: String,
    fcPortCards: String,
    managementIp: String,
    ipmiIp: String,
    os: String
});

module.exports = Mongoose.model('LabHardwareInventory', HardwareInventorySchema);