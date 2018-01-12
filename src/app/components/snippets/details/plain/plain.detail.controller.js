(function () {
    'use strict';

    angular
        .module('project.components')
        .controller('plainDetailController', plainDetailController);

    /** @ngInject */
    function plainDetailController(
        $mdDialog,
        snippet
    ) {

        var vm = this;

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		      Methods
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        vm.close = close;
        vm.buyProduct = buyProduct;

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Variables
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        vm.snippet = snippet;

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		      Method Declarations
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function close() {
          $mdDialog.cancel();
        }

        function buyProduct() {
          $mdDialog.hide(vm.snippet);
        }


    }

}());
