/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

angular.module('SynetoLabsApp').factory('HardwareService', ['$http', function($http){
    return {
        getHardwareList: function() {
            return $http.get('/api/v1/hardware-inventory-list').then(function(response) {
                return response || [];
            });
        },
        getHardwareDetails: function(hardwareId){
            return $http.get('/api/v1/hardware-details/' + encodeURI(hardwareId)).then(function(response){
                return response.data || [];
            });
        },
        addNewHardware: function(hardwareData) {
            return $http.post('/api/v1/create-new-hardware', hardwareData).then(function(response){
                return response.data;
            });
        },
        updateHardwareProperties: function(hardwareId, hardwareData) {
            return $http.put('/api/v1/edit-hardware/' + encodeURI(hardwareId), hardwareData);
        },
        deleteExistingHardware: function(hardwareId) {
            return $http.post('/api/v1/delete-hardware/' + encodeURI(hardwareId));
        }
    }
}]);