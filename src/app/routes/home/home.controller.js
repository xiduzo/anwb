(function () {
  'use strict';

  angular
    .module('project.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(
    ELASTIC_SETUP,
    $http,
    $mdDialog,
    $timeout,
    $document,
    $scope,
    $rootScope
  ) {

    var vm = this;

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Methods
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    vm.processInput = processInput;
    vm.showDetailInfo = showDetailInfo;

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Variables
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    vm.input = "";
    vm.conversation = [];
    vm.start = false;

    // Some variables are only neededin the local scope
    var elastic = ELASTIC_SETUP;

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Services
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // Get all the snippets
    $http.get('snippets.json')
    .then(function(response) {
      _.each(response.data.snippets, function(snippet, index) {
        snippet.id = index;
        elastic.addDoc(snippet);
      });
    })
    .catch(function(error) {
      console.log(error);
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Extra logic
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    $rootScope.$on('message', function(args, response) {
      vm.processInput(response.input);
    });

    $rootScope.$on('hardReset', function(args, response) {
      vm.start = false;
      vm.conversation = [];
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Method Declarations
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    function elesticSearch(input) {
      return elastic.search(input, {
        fields: {
          title: {boost: 1.1, expand: false},
          short: {boost: 1.2, expand: true},
          description: {boost: 1.4, expand: true},
          tags: {boost: 2.5, expand: true},
        },
        bool: "OR",
        expand: true
      });
    }

    function scrollBottom(field) {
      if($('#'+field)[0]) {
        $('#'+field).stop().animate({
          scrollTop: $('#'+field)[0].scrollHeight
        }, 800);
      }
    }

    function scrollTop(main, field) {
      if($('#'+main)[0] && $('#'+field)[0]) {
        $('#'+main).scrollTo('#'+field);
      }
    }

    function transformText(text) {
      text = text.replace(/\[/g, "<em>");
      text = text.replace(/\]/g, "</em>");
      return text;
    }

    function determineColWidth(snippet, snippets, index) {
      switch (snippets.length) { // This works, don't realy know why \o.0/
        case 2:
        case 4:
          return {xs: 100, sm: 100, md: 50, lg: 50};
          break;
        case 3:
        case 6:
          return {xs: 100, sm: 100, md: 33, lg: 33};
          break;
        case 5:
        case 8:
          if(index < 2) { return {xs: 100, sm: 100, md: 50, lg: 50}; }
          return {xs: 100, sm: 100, md: 33, lg: 33};
          break;
        case 7:
          if(index < 3) { return {xs: 100, sm: 100, md: 33, lg: 33}; }
          return {xs: 100, sm: 100, md: 25, lg: 25};
          break;
      }
    }

    function processInput(input, followUp) {
      var input = input || vm.input;
      if(!input) return false;

      // Clear the input
      vm.input = '';

      // Check if we need to start the app
      if(!vm.start) { vm.start = true; }

      // The object we will work on with this process
      var tempObj = {
        datetime: moment(),
        question: '',
        answer: {},
        snippets: [],
        showMessage: false
      };

      // Get snippets
      var snippets = elesticSearch(input);

      if(followUp) {
        snippets = _.filter(snippets, function(snippet, index) {
          return index != 0;
        });
      } else {
        tempObj.question = input;
      }

      // Set the threshold based on the number of items and the max score
      var baseThreshold = 0.27; // It should have at least a base score
      var threshold = snippets.length > 0 ? _.first(snippets).score * baseThreshold : 0;

      // Filter out the snippets that are not that relevant
      snippets = _.filter(snippets, function(snippet, index) {
        return (snippet.score >= threshold);
      });

      console.log(snippets);

      var snippetsWithoutAnswers = _.filter(snippets, function(snippet, index) {
        return snippet.doc.type !== 0;
      });

      // Only get the 7 most relevant items
      snippetsWithoutAnswers = _.first(snippetsWithoutAnswers, 7);

      // Let the user know there is no relevant content
      if((threshold < baseThreshold || snippets.length === 0) && !followUp) {
        tempObj.answer = {
          text: transformText("Sorry, ik kan niets vinden voor jouw vraag. Misschien kun je hem anders formuleren? Of kan ik je ergens anders mee [helpen]?"),
          actions: [
            { text: "Help mij opweg", action: "Help mij opweg." }
          ]
        };
      }

      // Check if the first item has a response
      if(snippets.length > 0 ) {
        var tempAnswer = {
          text: '',
          actions: []
        };

        if(followUp) {
          tempAnswer.text = "[response], misschien is dit ook wel interessant voor jou?";
        } else if(_.first(snippets).doc.response) {
          var snippet = _.first(snippets).doc;

          tempAnswer.text = transformText(snippet.response);

          // Add the actions
          _.each(snippet.actions, function(action) {
            tempAnswer.actions.push({
              text: action.name,
              action: action.action
            });
          });
        } else {
          tempAnswer.text = "Hopelijk is dit waar je naar opzoek bent! Je kunt me altijd naar meer informatie vragen.";
        }

        // Set the answer
        tempObj.answer = tempAnswer;
      }

      // Loop through all the snippets which isnt info only
      _.each(snippetsWithoutAnswers, function(snippet, index) {
        // Set the content width
        snippet.width = determineColWidth(snippet, snippetsWithoutAnswers, _.indexOf(snippetsWithoutAnswers, snippet));

        // Add snippet to conversation
        tempObj.snippets.push({
          datetime: moment(),
          item: snippet.doc,
          confidence: snippet.score,
          width: snippet.width
        });
      }); // End of loop through snippets

      // Add everything to the conversation
      vm.conversation.push(tempObj);

      // Set a timer to show the actual message
      $timeout(function() {
        tempObj.showMessage = true;
        // Scroll the when the content is loaded
        scrollBottom('chatContent');
        scrollTop('conversationContent', 'conversation_item_'+ (vm.conversation.length - 1));
      }, tempObj.answer.text ? 1650 : 200);

      // Scroll the conversation for the text input
      scrollBottom('chatContent');
      scrollTop('conversationContent', 'conversation_item_'+ (vm.conversation.length - 1));

    } // End processInput

    function showDetailInfo($event, snippet) {
      $mdDialog.show({
        controller: 'plainDetailController',
        controllerAs: "plainDetailCtrl",
        templateUrl: snippet.item.body ? snippet.item.body : 'app/components/snippets/details/plain/plain.detail.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        locals: {
          snippet: snippet
        }
      })
      .then(function(response) {

        if(response) {
          // TODO
          // Fix the right response
          console.log(response.item.tags.join(" "));
          processInput(response.item.description, response.item);
        }
      })
      .catch(function() {
        // Canceled
      });
    } // End show detail info

  }

}());
