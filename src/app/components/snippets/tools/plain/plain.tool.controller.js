(function () {
    'use strict';

    angular
        .module('project.components')
        .controller('PlainToolController', PlainToolController);

    /** @ngInject */
    function PlainToolController(
      $scope,
      $rootScope
    ) {

        var vm = this;

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		      Methods
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        vm.sendMessage = sendMessage;
        vm.searchHoliday = searchHoliday;
        vm.searchSkiTrip = searchSkiTrip;

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Variables
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        vm.holidayType = '';
        vm.holidayDestination = '';
        vm.skiTripDestination = '';

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		      Method Declarations
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function sendMessage(message) {
          $rootScope.$broadcast('message', {
            input: message
          });
        }

        function searchHoliday() {
            var tempMessage = 'Ik wil ';

            if(!vm.holidayType && !vm.holidayDestination) {
                return false;
            }

            if(vm.holidayType) {
                tempMessage += vm.holidayType + ' ';
            }

            if(vm.holidayDestination) {
                tempMessage += (vm.holidayType ? 'in ' : 'op vakantie naar ') + vm.holidayDestination + '.';
            }

            vm.sendMessage(tempMessage);
        }

        function searchSkiTrip() {
            var tempMessage = 'Ik wil op wintersport naar ';

            if(vm.skiTripDestination) {
                vm.sendMessage(tempMessage + vm.skiTripDestination);
            }
        }


    }

}());
