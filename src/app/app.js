(function () {
    'use strict';

    angular
        .module('project', [

            //3rd Parties
            'ngCookies',
            'ngSanitize',
            'ui.router',
            'LocalStorageModule',
            'ngMaterial',
            'ngMdIcons',
            'duScroll',

            // Filters
            'secondsToDateTime',

            //Config
            'project.config',

            //Constants
            'project.constants',

            //modules
            'project.base',
            'project.services',
            'project.components',
            'project.directives',

            //routes
            'project.home',
    ]);

}());
