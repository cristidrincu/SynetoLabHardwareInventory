/**
 * Created by cristiandrincu on 7/7/15.
 */

'use strict';

angular.module('SynetoLabsApp')
    .factory('AlertService', ['$rootScope', '$timeout', function($rootScope, $timeout){

        $rootScope.alerts = [];

        var AlertService = {
            add: function(msg, alertType, timeout, cb) {
                $rootScope.alerts.push({
                    msg: msg,
                    type: alertType,
                    close: function() {
                        return AlertService.closeAlert(this);
                    }
                });

                if(timeout) {
                    $timeout(function () {
                        AlertService.closeAlert(this);
                    }, timeout);
                }

                cb();
            },
            closeAlert: function(alert) {
                return AlertService.closeAlertId($rootScope.alerts.indexOf(alert));
            },
            closeAlertId: function(index){
                return $rootScope.alerts.splice(index, 1);
            }
        };

        return AlertService;

    }]);