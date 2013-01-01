/*
 * jQuery Plugin (UMD) - v0.1.0
 * https://github.com/yefremov/jquery-plugin
 *
 * Copyright (c) 2012 Anton Yefremov
 * Free to use and abuse under the MIT license.
 * http://opensource.org/licenses/MIT
 */

(function ( root, factory ) {
  'use strict';

  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module
    define( ['jquery'], function ( jQuery ) {
      factory( root, jQuery );
    });
  } else {
    // Browser globals
    factory( root, jQuery );
  }
} ( this, function ( window, $, undefined ) {
  'use strict';

  // Collection method
  $.fn.plugin = function ( settings ) {

    // Plugin class definition
    function Plugin( element, options ) {
      var settings;

      // Initialization method
      function initialize( options ) {
        settings = options;
      }

      // Destroy method
      function destroy() {
        element.removeData( settings.namespace );
      }

      // Public API (access via .data method)
      $.extend( this, {
        'reinitialize': function ( options ) {
          destroy();
          initialize( options );
        }
      , 'destroy': function () {
          destroy();
        }
      });

      // Initialize plugin
      initialize( options );
    }

    // Customize settings
    settings = $.extend( {}, $.fn.plugin.defaults, settings, $.fn.plugin.privates );

    // Maintain chainability
    return this.each(function () {
      var element = $( this )
        , api = element.data( settings.namespace );

      if ( api ) {
        // Reinitialize if already initialized
        api.reinitialize( settings );
      } else {
        // Create new instance and reveal public API
        element.data( settings.namespace, new Plugin(element, settings) );
      }
    });
  };

  // Collection privates (modify on your own risk)
  $.fn.plugin.privates = {
    'namespace': 'jquery-plugin'
  };

  // Collection defaults
  $.fn.plugin.defaults = {
    // Default settings goes here
  };

  // Method to override defaults
  $.fn.plugin.setDefaults = function ( settings ) {
    $.extend( $.fn.plugin.defaults, settings );
  };

  // Static method
  $.plugin = function () {
    // Singleton instance definition
  };

  // Custom pseudo selector
  $.expr[':'].plugin = $.expr.createPseudo(function () {
    return function ( element ) {
      return element;
    };
  });
}));
