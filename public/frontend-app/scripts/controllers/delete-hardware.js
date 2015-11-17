/**
 * Created by cristiandrincu on 7/7/15.
 */

'use strict';

angular.module('SynetoLabsApp')
    .controller('DeleteHardwareController', ['$scope', '$state', '$modalInstance', 'hardwareId', 'HardwareService', function($scope, $state, $modalInstance, hardwareId, HardwareService){
        function init () {
            $scope.hardwareId = hardwareId;

            HardwareService.getHardwareDetails($scope.hardwareId).then(function(hardwareData){
                $scope.hardwareData = hardwareData;
            });
        }

        $scope.ok = function() {
            HardwareService.deleteExistingHardware($scope.hardwareId).then(function(response){
                if(response.status == 200){
                    $modalInstance.close('ok');
                }
            }, function (){
                //TODO - Add error message on promise reject
            });
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };

        init();
    }]);