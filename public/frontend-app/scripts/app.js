/**
 * Created by cristiandrincu on 7/6/15.
 */
'use strict';

angular.module('SynetoLabsApp',
    [
        'ui.router',
        'ui.bootstrap',
        'angularMoment',
        'ngStorage'
    ]
).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('allHardwareInventory', {
        url: '',
        templateUrl: 'scripts/views/master-template-view.html',
        abstract: true
    }).state('allHardwareInventory.hardwareInventoryHome', {
        url: '/hardware-inventory',
        templateUrl: 'scripts/views/lab-hardware-inventory.html',
        controller: 'HomeController'
     }).state('allHardwareInventory.addNewHardware', {
        url: '/add-new-hardware/basic',
        templateUrl: 'scripts/views/add-new-hardware.html',
        controller: 'AddNewHardwareController'
    }).state('allHardwareInventory.hardwareDetails', {
        url: '/hardware-details/:id',
        templateUrl: 'scripts/views/hardware-details.html',
        controller: 'HardwareDetailsController'
    });

        $urlRouterProvider.otherwise('/hardware-inventory');
}]).constant('momentLocale', 'ro');