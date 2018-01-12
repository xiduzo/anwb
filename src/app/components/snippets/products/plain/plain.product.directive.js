(function () {
    'use strict';

    angular
        .module('project.components')
        .directive('plainProduct', plainProduct);

    /** @ngInject */
    function plainProduct() {

        return {
            restrict: 'E',
            templateUrl: 'app/components/snippets/products/plain/plain.product.html',
            controller: 'PlainProductController',
            controllerAs: 'plainProductCtrl',
            replace: true,
            bindToController: true,
            scope: {
                snippet: '=snippet'
            }
        };

    }

}());
