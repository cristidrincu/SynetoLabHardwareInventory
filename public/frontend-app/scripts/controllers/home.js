/**
 * Created by cristiandrincu on 7/6/15.
 */

'use strict';

angular.module('SynetoLabsApp').controller('HomeController', ['$scope', '$modal', '$state', '$stateParams', '$localStorage', 'HardwareService', 'AlertService', function($scope, $modal, $state, $stateParams, $localStorage, HardwareService, AlertService){
    function init() {
        $scope.searchHardwareName = '';
        HardwareService.getHardwareList().then(function(hardwareList){
            $scope.hardwares = hardwareList.data;
            $localStorage.hardwareIds = hardwareList.data.map(function(hardware){
                return hardware._id;
            });
            $scope.formData = {};
        }, function () {
            //TODO - log an error message
        });
    }

    $scope.deleteHardware = function(hardwareId){
        var modalInstance = $modal.open({
            templateUrl: "scripts/views/modals/delete-hardware-modal.html",
            controller: "DeleteHardwareController",
            windowClass: "cc-modal",
            backdrop: "static",
            resolve: {
                hardwareId: function () {
                    return hardwareId;
                }
            }
        });

        modalInstance.result.then(function(){
            init();
        });
    };

    init();
}]);