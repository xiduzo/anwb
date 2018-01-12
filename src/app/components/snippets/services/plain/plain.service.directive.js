(function () {
    'use strict';

    angular
        .module('project.components')
        .directive('plainService', plainService);

    /** @ngInject */
    function plainService() {

        return {
            restrict: 'E',
            templateUrl: 'app/components/snippets/services/plain/plain.service.html',
            controller: 'PlainServiceController',
            controllerAs: 'plainServiceCtrl',
            replace: true,
            bindToController: true,
            scope: {
                snippet: '=snippet'
            }
        };

    }

}());
