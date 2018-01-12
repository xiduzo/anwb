(function () {
    'use strict';

    angular
        .module('secondsToDateTime', [])

        // Example filter
        .filter('secondsToDateTime', function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        })

        ; // End of filters

}());
