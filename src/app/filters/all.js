define(['angular', 'jquery', 'underscore', 'showdown'], function(angular, $, _, Showdown, $window) {
  'use strict';

  var module = angular.module('kibana.filters');

  module.filter('stringSort', function() {
    return function(input) {
      return input.sort();
    };
  });

  module.filter('pinnedQuery', function(querySrv) {
    return function( items, pinned) {
      var ret = _.filter(querySrv.ids,function(id){
        var v = querySrv.list[id];
        if(!_.isUndefined(v.pin) && v.pin === true && pinned === true) {
          return true;
        }
        if((_.isUndefined(v.pin) || v.pin === false) && pinned === false) {
          return true;
        }
      });
      return ret;
    };
  });

  module.filter('slice', function() {
    return function(arr, start, end) {
      if(!_.isUndefined(arr)) {
        return arr.slice(start, end);
      }
    };
  });

  module.filter('stringify', function() {
    return function(arr) {
      if(_.isObject(arr) && !_.isArray(arr)) {
        return angular.toJson(arr);
      } else {
        return arr.toString();
      }
    };
  });

  module.filter('noXml', function() {
    var noXml = function(text) {
      return _.isString(text)
        ? text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
        : text;
    };
    return function(text) {
      return _.isArray(text)
        ? _.map(text, noXml)
        : noXml(text);
    };
  });

  module.filter('urlLink', function() {
    var  //URLs starting with http://, https://, or ftp://
      r1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|*])/gim,
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      r2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
      //Change email addresses to mailto:: links.
      //only with line beginning or whitespace before it,
      //so as not to re-link these ... ftp://user:password@host/path done above.
      r3 = /(^|[\s])([a-zA-Z_0-9\.]+?@[a-zA-Z_0-9\.]+)/gim;

    var urlLink = function(text) {
      var t1,t2,t3;
      if(!_.isString(text)) {
        return text;
      } else {
        _.each(text.match(r1), function() {
          t1 = text.replace(r1, "<a href=\"$1\" target=\"_blank\">$1</a>");
        });
        text = t1 || text;
        _.each(text.match(r2), function() {
          t2 = text.replace(r2, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
        });
        text = t2 || text;
        _.each(text.match(r3), function() {
          t3 = text.replace(r3, "$1<a href=\"mailto:$2\">$2</a>");
        });
        text = t3 || text;
        return text;
      }
    };

    return function(text) {
      return _.isArray(text)
        ? _.map(text, urlLink)
        : urlLink(text);
    };
  });

  module.filter('urlLinkAsIcon', function() {
    var  //URLs starting with http://, https://, or ftp://
      r1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|*])/gim,
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      r2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
      //Change email addresses to mailto:: links.
      r3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

    var urlLink = function(text) {
      var t1,t2,t3;
      if(!_.isString(text)) {
        return text;
      } else {
        _.each(text.match(r1), function() {
          t1 = text.replace(r1, '<a class="icon-search pointer" href="$1" target="_blank"></a>');
        });
        text = t1 || text;
        _.each(text.match(r2), function() {
          t2 = text.replace(r2, '<a class="icon-search pointer" href="http://$2" target="_blank"></a>');
        });
        text = t2 || text;
        _.each(text.match(r3), function() {
          t3 = text.replace(r3, '<a class="icon-search pointer" href="mailto:$1"></a>');
        });
        text = t3 || text;
        return text;
      }
    };

    return function(text) {
      return _.isArray(text)
        ? _.map(text, urlLink)
        : urlLink(text);
    };
  });

  module.filter('gistid', function() {
    var gist_pattern = /(\d{5,})|([a-z0-9]{10,})|(gist.github.com(\/*.*)\/[a-z0-9]{5,}\/*$)/;
    return function(input) {
      if(!(_.isUndefined(input))) {
        var output = input.match(gist_pattern);
        if(!_.isNull(output) && !_.isUndefined(output)) {
          return output[0].replace(/.*\//, '');
        }
      }
    };
  });

  module.filter('capitalize', function() {
    return function(input) {
        if (input != null) {
          return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    };
  });

  module.filter('newlines', function() {
    return function(input) {
      if (input) {
        return input.replace(/\n/g, '<br/>');
      }
    };
  });

  module.filter('striphtml', function() {
    return function(text) {
      if (text) {
        return text
          .replace(/&/g, '&amp;')
          .replace(/>/g, '&gt;')
          .replace(/</g, '&lt;');
      }
    };
  });

  module.filter('markdown', function() {
    return function(text) {
      if (text) {
        var converter = new Showdown.converter();
        var textConverted = text.replace(/&/g, '&amp;')
          .replace(/>/g, '&gt;')
          .replace(/</g, '&lt;');
        return converter.makeHtml(textConverted);
      }
    };
  });

  module.filter('thousandSeparator', function() {
    return function(number) {
      if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return number;
      }
    };
  });

  module.filter('safeFragment', function() {
    return function(text) {
      if (text) {
        return text.replace(/\./g, '_');
      }
    };
  });
});
