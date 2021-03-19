define([
  'angular',
  'app',
  'underscore'
],
function (angular, app, _, $rootScope) {
  'use strict';

  angular
    .module('kibana.directives')
    .directive('valueWithLinks', function($compile, $filter, $timeout, $window, $rootScope, dashboard, filterSrv) {
      return {
        scope: {
            value: '@',
            key: '@',
            panel: '@'
        },
        restrict: 'E',
        link: function(scope, elem, attrs) {
          //var newWindow;
          var expand = false;
          scope.viewMore= function(field) {
              expand = true;
              scope.runWatch();
          };

          scope.collapse = function() {
              expand = false;
              scope.runWatch();
          };

          scope.openWindow = function(field, value) {
              var url = $window.location.href;
              var newWindow = $window.open(url);
              newWindow.filter_field = field
              newWindow.filter_value = value;
          }

          scope.applyFilter = function(field, value) {
            filterSrv.set({
              type: 'terms',
              field: field,
              value: value
            });
            dashboard.refresh();
          };

          scope.$watch(function () {
            return [attrs.key, attrs.value, attrs.panel];
          }, function() {
            scope.runWatch();
          }, true);

          scope.runWatch = function(){
            const k = attrs.key;
            if (k) {
              let template = scope.value;
              const panel = JSON.parse(scope.panel);

              // determine if the value is an array
              try{
                const isJson = JSON.parse(scope.value);
                if(Array.isArray(isJson)){
                    template = isJson.map(function (e) {
                      return e;
                    }).join('*:*');
                }
              }catch(e){

              }

              template = $filter('noXml')(template);
              template = $filter('urlLink')(template);
              template = $filter('stringify')(template);

              if ((panel.filter_fields || []).includes(k)) {
                template = template.split('*:*').map(function (store) {
                  return '<a style="cursor: pointer;" title="Click to filter" ng-click=\'applyFilter('+JSON.stringify(k)+','+JSON.stringify(store)+')\'>'+store.trim()+'</a>';
                }).join('<br/>');
              } else if ((panel.clear_fields || []).includes(k)) {
                template = template.split('*:*').map(function (store) {
                  return '<a style="cursor: pointer;" title="Click for references" target="_blank" ng_click=\'openWindow('+JSON.stringify(k)+','+JSON.stringify(store)+')\'>' + store.trim() + ' </a>';
                }).join('<br/>');
              } else if ((panel.file_fields || []).includes(k)) {
                template = template.split('*:*').map(function (file) {
                  console.log(panel)
                  const baseUrl = panel.fileBaseUrl;
        
                  // prepend the new base url and wrap with an <a> tag
                  return '<a target="_blank" href="' + baseUrl + file + '">' + file + '</a>';
                }).join('<br/>');
              } else if ((panel.expand_fields || []).includes(k)) {
                if (expand == false && template.split('*:*').length > 10) {
                    var stores = template;
                    template = template.split('*:*').sort().slice(0, 10).map(function (store) {
                      return '<a style="cursor: pointer;" title="Click to Filter" ng-click=\'applyFilter('+JSON.stringify(k)+','+JSON.stringify(store)+')\'>'+store.trim()+'</a>';
                    })
                    template.push('<a style="cursor: pointer;" title="Click to Filter" ng-click=\'viewMore()\'>Show More...</a>');
                    template = template.join('<br/>');
                } else {
                    var stores = template;
                    template = template.split('*:*').sort().map(function (store) {
                      return '<a style="cursor: pointer;" title="Click to Filter" ng-click=\'applyFilter('+JSON.stringify(k)+','+JSON.stringify(store)+')\'>'+store.trim()+'</a>';
                    });
                    if (stores.split('*:*').length > 10) {
                        template.push('<a style="cursor: pointer;" title="Click to Collapse" ng-click=\'collapse()\'>Collapse...</a>');
                    }
                    template = template.join('<br/>');
                }

              } else {
                template = template.split('*:*').join(',');
              }

              template = '<span>'+template+'</span>';

              elem.html($compile(angular.element(template))(scope));
            }
          };
        }
      };
    });
});
