/**
 * EventRegistry.js v1.0.0
 * @author Steven Sojka
 *
 * This module extends EventEmitter.js to allow event binding to
 * classes or objects and register them to a specific event emitter.
 *
 * https://github.com/steelsojka/EventRegistry
 *
 * - Licensed under the MIT license
 *
 * @extends {EventEmitter}
 * @requires EventEmitter.js
 * @example
 *
 * var Person = function(name) {
 *   this.name = name;
 * }
 *
 * Person.prototype = {
 *   greet : function() {
 *     alert("Hi, my name is " + this.name);
 *   },
 *   reply : function() {
 *     alert("Nice to meet you! I'm " + this.name);
 *   }
 * }
 *
 * var myEmitter = new EventEmitter();
 *
 * // This classes prototype is now extended with on, emit and bind methods
 * // that are directing to myEmitter instance
 *
 * myEmitter.register(Person);
 *
 * var me = new Person("Steven");
 * var you = new Person("David");
 *
 * you.on('greet', function() {
 *   this.greet();
 *   this.emit('reply');
 * });
 *
 * me.on('reply', function() {
 *   this.reply();
 * });
 *
 * you.emit('greet');
 *
 * // alerts "Hi, my name is David"
 * // second alert "Nice to meet you! I'm Steven"
 *
 */

;var EventEmitter = (function(EventEmitter) {

  'use strict'

  //The current EventEmitter prototype
  var EE_PROTO = EventEmitter.extend();

  /**
   * Registers an object or object instance to a specific event emitter.
   * @param  {Function|Object|Array} object Object, Function class, or Array of objects
   *                                        that will be tied to an event emitter.
   * @return {Null}
   */
  EE_PROTO.register = function(object) {
    var self = this;
    var _prototype = {
      on : function(event, listener, scope, once) {
        var _scope = scope || this;
        self.on.call(self, event, listener, _scope, once);
      },
      emit : function() {
        self.emit.apply(self, arguments);
      }
    };

    //Alias for on
    _prototype.bind = _prototype.on;

    if(_isArray(object)) {
      for (var i = object.length - 1; i >= 0; i--) {
        _setProto(object[i], _prototype);
      };
    } else {
      _setProto(object, _prototype);
    }
  }

  // Set new EventEmitter prototype
  EventEmitter.prototype = EE_PROTO;

  // Check to see if object is an array
  var _isArray = function(a) {
    return Object.prototype.toString.apply(a) === '[object Array]';
  };

  // Sets either the prototype if object is a function or
  // adds to an object if an instance.
  var _setProto = function(object, _prototype) {
    if(typeof object === "function")
      object.prototype = _extend(object.prototype, _prototype);
    else if(typeof object === "object")
      object = _extend(object, _prototype);
  };

  //Internal extend object function
  var _extend = function(obj1, obj2) {
    var key;
    for(key in obj2) {
      if(obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  };

  //Return extened EventEmitter
  return EventEmitter

}(EventEmitter));  //Pass in global EventEmitter object
