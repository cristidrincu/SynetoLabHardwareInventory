/**
 * Created by cristiandrincu on 7/7/15.
 */

'use strict';

angular.module('SynetoLabsApp').controller('HardwareDetailsController', ['$scope', '$state', '$stateParams', '$modal', '$localStorage', 'HardwareService', 'AlertService', function($scope, $state, $stateParams, $modal, $localStorage, HardwareService, AlertService){

    var hardwareIds = $localStorage.hardwareIds;;

    function init(){
        $scope.editEnabled = false;
        $scope.hardware = {};
        HardwareService.getHardwareDetails($stateParams.id).then(function(hardwareDetails){
            $scope.hardwareDetails = hardwareDetails;
        });
    }

    $scope.updateHardwareDetails = function() {
        $scope.editEnabled = true;
    };

    $scope.update = function(hardwareId, hardware) {
        $scope.hardware = hardware;
        HardwareService.updateHardwareProperties(hardwareId, $scope.hardware).then(function(response) {
            if(response.status == 200) {
                AlertService.add('Ai facut update cu succes pentru acest element de hardware din cadrul Syneto Lab Hardware Inventory!', 'success', 3000, function(){
                    init();
                });
            }else {
                AlertService.add('A aparut o eroare!', 'danger', 3000, function(){
                    init();
                });
            }
        });
    };

    $scope.cancel = function() {
        $scope.editEnabled = false;
    };

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

        modalInstance.result.then(function() {
            AlertService.add('Ai sters cu succes elementul de hardware din cadrul Syneto Lab Hardware Inventory!', 'success', 3000, function(){
                $state.go('allHardwareInventory.hardwareInventoryHome');
            }, function() {
                AlertService.add('A aparut o eroare!', 'success', 3000, function(){
                    $state.go('allHardwareInventory.hardwareInventoryHome');
                });
            });

        });
    };

    $scope.isPrevEnabled = function () {
        return hardwareIds.indexOf($stateParams.id) > 0;
    };

    $scope.isNextEnabled = function () {
        return hardwareIds.indexOf($stateParams.id) < hardwareIds.length - 1;
    };

    $scope.gotoPrevHardware = function() {
        $state.go('allHardwareInventory.hardwareDetails', {
            id: hardwareIds[hardwareIds.indexOf($stateParams.id) - 1]
        });
    };

    $scope.gotoNextHardware = function() {
        $state.go('allHardwareInventory.hardwareDetails', {
            id: hardwareIds[hardwareIds.indexOf($stateParams.id) + 1]
        });
    };

    init();
}]);