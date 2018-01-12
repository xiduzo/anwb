(function () {
    'use strict';

    angular
        .module('project.config', ['project.constants'])
        .config(config);

    /** @ngInject */
    function config(
        $urlRouterProvider,
        $logProvider,
        $compileProvider,
        localStorageServiceProvider,
        $mdThemingProvider,
        $mdIconProvider,
        DEBUG_ENABLED
    ) {

        // Add fancy scrollTo function
        jQuery.fn.scrollTo = function(elem, speed) {
          $(this).animate({
            scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
          }, speed == undefined ? 1000 : speed);
          return this;
        };

        $urlRouterProvider.otherwise('/');

        $logProvider.debugEnabled(DEBUG_ENABLED);

        $compileProvider.debugInfoEnabled(DEBUG_ENABLED);

        localStorageServiceProvider.setPrefix('project');

        $mdThemingProvider
            // .definePalette('cmdContrast', {
            //     // Im color blind, not that creative with colors
            //     '50':   'FAFAFA', // #FAFAFA
            //     '100':  'F5F5F5', // #F5F5F5
            //     '200':  'EEEEEE', // #EEEEEE
            //     '300':  'E0E0E0', // #E0E0E0
            //     '400':  'BDBDBD', // #BDBDBD
            //     '500':  '9E9E9E', // #9E9E9E
            //     '600':  '757575', // #757575
            //     '700':  '616161', // #616161
            //     '800':  '424242', // #424242
            //     '900':  '212121', // #212121
            //     'A100': '757575', // #757575
            //     'A200': '616161', // #616161
            //     'A400': '424242', // #424242
            //     'A700': '212121', // #212121
            //     'contrastDefaultColor': 'light',
            //     'default': '000000' // #000000
            // })
            // Set the theme to default
            .theme('default')

            // Set palletes
            .primaryPalette('amber')
            .accentPalette('blue')
        ; // End of theming

        $mdIconProvider
            .icon('basket', './assets/icons/icon1.svg', 48)
            .icon('shield', './assets/icons/icon2.svg', 48)
            .icon('user', './assets/icons/icon3.svg', 48)
            .icon('menu', './assets/icons/icon4.svg', 24)
            .icon('send', './assets/icons/icon5.svg', 48)
            .icon('send_white', './assets/icons/arrow_white.svg', 24)
        ; // End of icons

    }

}());
