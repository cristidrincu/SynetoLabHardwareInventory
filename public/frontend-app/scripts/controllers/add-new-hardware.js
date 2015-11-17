/**
 * Created by cristiandrincu on 7/6/15.
 */
'use strict';

angular.module('SynetoLabsApp').controller('AddNewHardwareController',
    [
        '$scope',
        '$state',
        '$stateParams',
        '$modal',
        'moment',
        'momentLocale',
        'HardwareService',
        'AlertService', function($scope, $state, $stateParams, $modal, moment, momentLocale, HardwareService, AlertService){

    function init(){

        $scope.searchHardwareName = '';
        $scope.messageFromDirective = '';
        $scope.currentSnapshotDate = new Date();
        moment.locale(momentLocale);

        HardwareService.getHardwareList().then(function(hardwareList){
            $scope.hardwares = hardwareList.data;
            $scope.formData = {};
            $scope.submitted = false;
        });

        $scope.$on('showingSnapshot', function(){
            $scope.messageFromDirective = 'Showing snapshot for: '  + moment($scope.currentSnapshotDate).format('Do MMMM YYYY, h:mm:ss a');
        });

        $scope.$on('closingSnapshot', function(){
            $scope.messageFromDirective = 'Closing snapshot';
            $scope.searchHardwareName='';
        });

    }

    $scope.save = function(){
        $scope.submitted = true;
        HardwareService.addNewHardware($scope.formData).then(function(){
            AlertService.add('Ai adaugat cu succes un nou element de hardware in cadrul Syneto Lab Hardware Inventory!', 'success', 3000, function(){
                init();
            });
        }, function(){
            AlertService.add('A aparut o eroare!', 'danger', 3000, function(){
                init();
            });
        }).catch(function(response){
            if(response.data.length > 1) {
                console.log('A aparut o eroare in salvarea entitatii!')
            }
        });
    };

    $scope.cancel = function() {
        $state.go('allHardwareInventory.hardwareInventoryHome');
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

        modalInstance.result.then(function(){
            init();
        });
    };

    $scope.triggerSnapshotHardware = function () {
        //broadcast down the scope
        $scope.$broadcast('triggerSnapshotHardware');
    };

    $scope.closeSnapshot = function () {
        $scope.$broadcast('hideSnapshotHardware');
    };

    init();

}]);