(function () {
    'use strict';

    angular
        .module('project.home', ['ui.router'])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('base.home', {
            url: '/',
            views: {
                'main@base': {
                    templateUrl: 'app/routes/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl'
                }
            }
        });

    }
})();
