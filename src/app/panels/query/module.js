/*

  ## query

  ### Parameters
  * query ::  A string or an array of querys. String if multi is off, array if it is on
              This should be fixed, it should always be an array even if its only
              one element
*/
define([
  'angular',
  'app',
  'underscore',
  'css!./query.css'
], function (angular, app, _) {
  'use strict';

  var module = angular.module('kibana.panels.query', []);
  app.useModule(module);

  module.controller('query', function($scope, querySrv, dashboard, $rootScope, $http) {
    $scope.panelMeta = {
      modals: [{
        description: "Inspect",
        icon: "icon-info-sign",
        partial: "app/partials/inspector.html",
        show: true
      }],
      status  : "Stable",
      description : "Provide a search bar for free-form queries. You almost certainly want one of these somewhere prominent on your dashboard."
    };

    // Set and populate defaults
    var _d = {
      query   : "*:*",
      pinned  : true,
      history : [],
      tags: [],
      spyable : true,
      remember: 10, // max: 100, angular strap can't take a variable for items param
    };
    _.defaults($scope.panel, _d);

    $scope.querySrv = querySrv;

    // track whether autocomplete suggestions have been built in Solr
    $scope.suggestionsBuilt = false;

    $scope.init = function() {
      //
    };

    // listen for the status of the term search module and set the loading status accordingly
    $scope.status = '&nbsp;';

    $scope.$on('onLoadingTrue', function(event, args) {
      $scope.panelMeta.loading = true;
      $scope.status = 'Updating search table results, please wait...';
    });

    $scope.$on('onLoadingFalse', function(event, args) {
      $scope.panelMeta.loading = false;
      $scope.status = '&nbsp;';
    });

    // watch the input and update the typeahead options accordingly
    $scope.$watch('querySrv.list', function(newValues, oldValues, scope) {
      let query = newValues[1].query;
      if (query && query.length) {
        // get the fields from the schema
        let fields = $scope.fields.list;

        // split query and only autocomplete last term
        const TERM_REGEX = /([^\s:]*):(?:"(\\(?:["\\\/bfnrt]|u[a-fA-F0-9]{4})|[^"\\\0-\x1F\x7F]+)*"|([^"][^\s]*))\s+/g;
        const matches = [...query.matchAll(TERM_REGEX)];
        const lastMatch = matches[matches.length - 1];
        let queryStart, // the query up to the term being entered
          queryField, // the field currently being entered (i.e. aircraft)
          queryTerm, // the term currently being entered (i.e. F-16)
          queryFieldCompleted; // whether the field has been full entered yet
        if (
          lastMatch != undefined
          && lastMatch.index + lastMatch[0].length === query.length
        ) {
          queryStart = query.substring(0, lastMatch.index);
          queryField = lastMatch[1];
          queryTerm = lastMatch[2] || lastMatch[3];
          queryFieldCompleted = true;
        } else {
          let restOfQuery;
          if (lastMatch != undefined) {
            queryStart = query.substring(
              0, lastMatch.index + lastMatch[0].length);
            restOfQuery = query.substring(
              lastMatch.index + lastMatch[0].length);
          } else {
            queryStart = '';
            restOfQuery = query;
          }
          queryFieldCompleted = restOfQuery.includes(':');
          [ queryField, ...queryTerm ] = restOfQuery.split(':');
          queryTerm = queryTerm.join(':');
          if (queryTerm.startsWith('"')) {
            try {
              queryTerm = JSON.parse(queryTerm);
            } catch {
              queryTerm = JSON.parse(queryTerm + '"');
            }
          }
        }
        if (!queryFieldCompleted) {
          // if the user hasn't typed a colon yet, treat what they've typed as
          // either a term or a field
          queryTerm = queryField;
        }

        fields = fields.filter(function(tag) {
          // exclude these tags as they do not return a viable search
          return ['Index', '_root_', '_version_', 'stage', 'cjp_id',
          'proprietary', 'ser', 'folder', 'data_type', 'clearance_date',
          'job_id', 'project_id', 'extension', 'distribution_policy',
          'origination_date'].indexOf(tag) === -1;
        })

        $scope.panel.tags = [];

        if (!queryFieldCompleted) {
          // iterate the fields and add prefix matches as typeahead options
          fields.map((field) => {
            if (field.toLowerCase().startsWith(queryTerm.toLowerCase())) {
              $scope.panel.tags.push(queryStart + field + ':');
            }
          });
        }

        if (queryTerm !== '') {
          // call out to solr to get suggestions and process
          const suggestParams = {
            suggest: 'true',
            wt: 'json',
            'suggest.q': queryTerm,
          };
          if (!$scope.suggestionsBuilt) {
            suggestParams['suggest.build'] = 'true';
          }
          // we have to build the query string ourselves because this version
          // of angularjs doesn't support multiple values for a single key
          let suggestQueryStr = Object.keys(suggestParams)
            .map(key => encodeURIComponent(key) + '='
              + encodeURIComponent(suggestParams[key]))
            .join('&');
          // if we haven't completed the first query part yet, suggest values
          // for all fields
          if (!queryFieldCompleted || queryField === '*') {
            suggestQueryStr = suggestQueryStr + '&' + fields.map(field =>
              'suggest.dictionary=' + encodeURIComponent(field)).join('&');
          } else {
            suggestQueryStr = suggestQueryStr + '&suggest.dictionary='
              + encodeURIComponent(queryField);
          }
          $http({
            method: 'GET',
            url: dashboard.current.solr.server
              + dashboard.current.solr.core_name + '/suggest?'
              + suggestQueryStr,
          }).then(function(response) {
            const suggestionsTree = response.data.suggest;

            // suggestions are now built
            $scope.suggestionsBuilt = true;

            // iterate the stores to get the suggestions
            const allSuggestions = [];
            Object.keys(suggestionsTree).forEach((storeName) => {
              const storeSuggestions =
                suggestionsTree[storeName][queryTerm].suggestions;
              storeSuggestions.forEach((suggestion) => {
                const { term, weight } = suggestion;
                allSuggestions.push({ term, weight, field: storeName });
              });
            });

            allSuggestions.sort((suggestionA, suggestionB) =>
              suggestionB.weight - suggestionA.weight);
            allSuggestions.forEach((suggestion) => {
              let { term, field } = suggestion;
              if (term.includes(' ')) {
                // escape multiple-word terms with quotes
                term = JSON.stringify(term);
              }
              $scope.panel.tags.push(queryStart + field + ':' + term);
            })
          }, function(response) {
            console.error(response);
          });
        }
      }
    }, true);

    $scope.reset = function() {
      const query = _d.query;
      try {
        $scope.querySrv.list[Object.keys($scope.querySrv.list).length - 1].query = query;
      } catch (e) {
        $scope.querySrv.list[1].query = query;
      }
      $rootScope.$broadcast('refresh');
    };

    $scope.refresh = function() {
      update_history(_.pluck($scope.querySrv.list,'query'));
      $rootScope.$broadcast('refresh');
    };

    $scope.render = function() {
      $rootScope.$broadcast('render');
    };

    $scope.toggle_pin = function(id) {
      querySrv.list[id].pin = querySrv.list[id].pin ? false : true;
    };

    $scope.close_edit = function() {
      $scope.refresh();
    };

    var update_history = function(query) {
      if($scope.panel.remember > 0) {
        // do not save the colon delimited queries to history. they may not be
        // used as we are overriding the type-ahead
        if (query.indexOf(':') === -1) {
          $scope.panel.history = _.union(query.reverse(), $scope.panel.history);
          var _length = $scope.panel.history.length;
          if (_length > $scope.panel.remember) {
            $scope.panel.history = $scope.panel.history.slice(0, $scope.panel.remember);
          }
        }
      }
    };

    $scope.init();
  });
});
