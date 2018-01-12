(function () {
    'use strict';

    angular
        .module('project.components')
        .directive('plainTool', plainTool);

    /** @ngInject */
    function plainTool() {

        return {
            restrict: 'E',
            templateUrl: 'app/components/snippets/tools/plain/plain.tool.html',
            controller: 'PlainToolController',
            controllerAs: 'plainToolCtrl',
            replace: true,
            bindToController: true,
            scope: {
                snippet: '=snippet'
            }
        };

    }

}());
