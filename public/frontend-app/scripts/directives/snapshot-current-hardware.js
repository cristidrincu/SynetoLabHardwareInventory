/**
 * Created by cristiandrincu on 7/10/15.
 */

'use strict';

angular.module('SynetoLabsApp')
    .directive('snapshotCurrentHardware', function(){

        function showHardwareSnapshotAnimation(element){
            element.fadeIn();
        }

        function hideHardwareSnapshotAnimation(element) {
            element.fadeOut();
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/views/directive-templates/snapshot-current-hardware.html',
            link: function(scope, element) {
                scope.$on('triggerSnapshotHardware', function(){
                    showHardwareSnapshotAnimation(element);
                    scope.$emit('showingSnapshot');
                });

                scope.$on('hideSnapshotHardware', function() {
                    hideHardwareSnapshotAnimation(element);
                    scope.$emit('closingSnapshot');
                });
            }
        }
    });
