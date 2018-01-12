(function () {
    'use strict';

    angular.module('project.constants', [])

        .constant('DEBUG_ENABLED', true)

        .constant('ELASTIC_SETUP', elasticlunr(function() {
          this.use(lunr.du);
          this.setRef("id"); // Set the reference
          this.addField("title");
          this.addField("short");
          this.addField("description");
          this.addField("tags");
        }))

        ; // End of constants

}());
