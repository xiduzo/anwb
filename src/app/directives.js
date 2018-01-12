(function () {
    'use strict';

    angular
        .module('project.directives', [])
        .directive('ngEnter', function() {
          return function(scope, element, attrs) {
            element.bind("keydown", function(e) {
              if(e.which === 13) {
                scope.$apply(function(){
                  scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
              }
            });
          };
        })

        .directive('ngBackground', function() {
            return function(scope, element, attrs){
                var url = attrs.ngBackground;
                element.css({ 'background-image': 'url(' + url +')' });
            };
        });

        ; // End of directives

}());
