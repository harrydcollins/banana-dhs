/*

  ## singleFieldQuery

  ### Parameters
  * query ::  A string or an array of querys. String if multi is off, array if it is on
              This should be fixed, it should always be an array even if its only
              one element
*/
define([
  'angular',
  'app',
  'underscore',
  'css!./singleFieldQuery.css'
], function (angular, app, _) {
  'use strict';

  var module = angular.module('kibana.panels.singleFieldQuery', []);
  app.useModule(module);

  module.controller('singleFieldQuery', function($scope, querySrv, dashboard, $rootScope, $http) {
    $scope.panelMeta = {
      modals: [{
        description: "Inspect",
        icon: "icon-info-sign",
        partial: "app/partials/inspector.html",
        show: true
      }],
      status  : "Stable",
      description : "Provide a search bar for queries of a single field."
    };

    // Set and populate defaults
    var _d = {
      queries: [{
        term: '',
      }],
      suggestions: {},
      pinned: true,
      spyable : true,
    };
    _.defaults($scope.panel, _d);

    $scope.querySrv = querySrv;

    // track whether autocomplete suggestions have been built in Solr
    $scope.suggestionsBuilt = false;

    $scope.init = function() {
      if ($scope.querySrv.ids.length === 1) {
        const queryId = $scope.querySrv.ids[0];
        const query = $scope.querySrv.list[queryId];
        if (query.query === '*:*') {
          query.singleField = true;
          query.queryPieces = {};
          $scope.panel.query = query;
          return;
        }
      }
      Object.values($scope.querySrv.list).forEach((query) => {
        if (query.singleField) {
          $scope.panel.query = query;
          return;
        }
      });
      $scope.panel.query = { singleField: true, queryPieces: {} };
      $scope.querySrv.set($scope.panel.query);
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
    $scope.watchFunction = function(newQueries, oldQueries, scope) {
      const fieldQueryPieces = [];
      newQueries.forEach((query, queryIndex) => {
        let { term } = query;
        term = term.trim();
        if (term.length > 0) {
          if ($scope.panel.field == "name_store_aircraft") {
            fieldQueryPieces.push(
              `${$scope.panel.field}:/.*${JSON.stringify(query.term)}.*/`);
	  } else {
            fieldQueryPieces.push(
              `${$scope.panel.field}:${JSON.stringify(query.term)}`);
	  }
        }
        const oldQuery = oldQueries[queryIndex]
        if (
          $scope.panel.autocomplete
          && (oldQuery == undefined || query.term !== oldQuery.term)
        ) {
          $scope.get_suggestions(query, queryIndex);
        }
      });
      $scope.panel.query.queryPieces[$scope.panel.field] = fieldQueryPieces;

      const queryPieces = [];
      Object.values($scope.panel.query.queryPieces).forEach(
        (fieldQueryPieces) => {
          queryPieces.push(...fieldQueryPieces);
        },
      );
      if (queryPieces.length === 0) {
        $scope.panel.query.query = '*:*';
      } else {
        $scope.panel.query.query = queryPieces.join(' AND ');
      }
    }

    $scope.$watch('panel.queries', $scope.watchFunction, true);

    $scope.get_suggestions = function (query, queryIndex) {
      const { term } = query;
      // call out to solr to get suggestions and process
      const suggestParams = {
        suggest: 'true',
        wt: 'json',
        'suggest.q': term,
        'suggest.dictionary': $scope.panel.field,
      };
      if (!$scope.suggestionsBuilt) {
        suggestParams['suggest.build'] = 'true';
      }
      const requestTime = new Date();
      //query.latestSuggestionRequestTime = requestTime;
      $http({
        method: 'GET',
        url: dashboard.current.solr.server
          + dashboard.current.solr.core_name + '/suggest',
        params: suggestParams,
      }).then(function(response) {
        // console.log(term, query.latestSuggestionRequestTime.getTime() - requestTime.getTime());
        // if (query.latestSuggestionRequestTime > requestTime) return;

        const suggestionsTree = response.data.suggest;

        // suggestions are now built
        $scope.suggestionsBuilt = true;

        // iterate the stores to get the suggestions
        const allSuggestions = [];
        Object.keys(suggestionsTree).forEach((storeName) => {
          const storeSuggestions =
            suggestionsTree[storeName][term].suggestions;
          storeSuggestions.forEach((suggestion) => {
            const { term, weight } = suggestion;
            allSuggestions.push({ term, weight});
          });
        });

        allSuggestions.sort((suggestionA, suggestionB) =>
          suggestionB.weight - suggestionA.weight);
        $scope.panel.suggestions[queryIndex] = allSuggestions.map(
          suggestion => suggestion.term);
      }, function(response) {
        console.error(response);
      });
    };

    $scope.remove = function(queryIndex) {
      const oldQueries = $scope.panel.queries;
      $scope.panel.queries.splice(queryIndex, 1);
      const newQueries = $scope.panel.queries;
      $scope.watchFunction(newQueries, oldQueries, $scope);
    }

    $scope.add = function() {
      $scope.panel.queries.push({
        term: '',
      });
    }

    $scope.reset = function() {
      $scope.panel.queries = [{
        term: '',
      }];
      $scope.panel.query.query = "*:*"
      $scope.querySrv.set($scope.panel.query);
      $rootScope.$broadcast('refresh');
    };

    $scope.refresh = function() {
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
  });
});
