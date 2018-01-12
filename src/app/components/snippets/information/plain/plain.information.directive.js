(function () {
    'use strict';

    angular
        .module('project.components')
        .directive('plainInformation', plainInformation);

    /** @ngInject */
    function plainInformation() {

        return {
            restrict: 'E',
            templateUrl: 'app/components/snippets/information/plain/plain.information.html',
            controller: 'PlainInformationController',
            controllerAs: 'plainInformationCtrl',
            replace: true,
            bindToController: true,
            scope: {
                snippet: '=snippet'
            }
        };

    }

}());
