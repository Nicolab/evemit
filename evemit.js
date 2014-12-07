/**
 * @name Evemit
 * @description Minimal and fast JavaScript event emitter for Node.js and front-end.
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/evemit
 * @license MIT https://github.com/Nicolab/evemit/blob/master/LICENSE
 */
;(function() {

  'use strict';

  /**
   * Evemit
   *
   * @constructor
   * @api public
   */
  function Evemit() {
    this.events = {};
  }

  /**
   * Register a new event listener for a given event.
   *
   * @param {string}   event      Event name.
   * @param {function} fn         Callback function (listener).
   * @param {*}        [context]  Context for function execution.
   * @return {Evemit} Current instance.
   * @api public
   */
  Evemit.prototype.on = function(event, fn, context) {

    if (!this.events[event]) {
      this.events[event] = [];
    }

    if(context) {
      fn._E_ctx = context;
    }

    this.events[event].push(fn);

    return this;
  };

  /**
   * Add an event listener that's only called once.
   *
   * @param {string}    event      Event name.
   * @param {function}  fn         Callback function (listener).
   * @param {*}         [context]  Context for function execution.
   * @return {Evemit} Current instance.
   * @api public
   */
  Evemit.prototype.once = function(event, fn, context) {
    fn._E_once = true;
    return this.on(event, fn, context);
  };

  /**
   * Emit an event to all registered event listeners.
   *
   * @param  {string} event      Event name.
   * @param  {*}      [...arg]   One or more arguments to pass to the listeners.
   * @return {bool} Indication, `true` if at least one listener was executed,
   * otherwise returns `false`.
   * @api public
   */
  Evemit.prototype.emit = function(event, arg1, arg2, arg3, arg4) {

    var fn, evs, args, aLn;

    if(!this.events[event]) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);
    aLn  = args.length;
    evs  = this.events[event];

    for(var i = 0, ln = evs.length; i < ln; i++) {

      fn = evs[i];

      if (fn._E_once) {
        this.off(event, fn);
      }

      // Function.apply() is a bit slower, so try to do without
      switch (aLn) {
        case 0:
          fn.call(fn._E_ctx);
          break;
        case 1:
          fn.call(fn._E_ctx, arg1);
          break;
        case 2:
          fn.call(fn._E_ctx, arg1, arg2);
          break;
        case 3:
          fn.call(fn._E_ctx, arg1, arg2, arg3);
          break;
        case 4:
          fn.call(fn._E_ctx, arg1, arg2, arg3, arg4);
          break;
        default:
          fn.apply(fn._E_ctx, args);
      }
    }

    return true;
  };

  /**
   * Remove event listeners.
   *
   * @param {string}   event  The event to remove.
   * @param {function} fn     The listener that we need to find.
   * @return {Evemit} Current instance.
   * @api public
   */
  Evemit.prototype.off = function(event, fn) {

    if (!this.events[event]) {
      return this;
    }

    for (var i = 0, ln = this.events[event].length; i < ln; i++) {

      if (this.events[event][i] === fn) {

        this.events[event][i] = null;
        delete this.events[event][i];
      }
    }

    // re-index
    this.events[event] = this.events[event].filter(function(ltns) {
      return typeof ltns !== 'undefined';
    });

    return this;
  };

  /**
   * Get a list of assigned event listeners.
   *
   * @param {string} [event] The events that should be listed.
   * If not provided, all listeners are returned.
   * Use the property `Evemit.events` if you want to get an object like
   * ```
   * {event1: [array of listeners], event2: [array of listeners], ...}
   * ```
   *
   * @return {array}
   * @api public
   */
  Evemit.prototype.listeners = function(event) {
    var evs, ltns;

    if(event) {
      return this.events[event] || [];
    }

    evs  = this.events;
    ltns = [];

    for(var ev in evs) {
      ltns = ltns.concat(evs[ev].valueOf());
    }

    return ltns;
  };

  /**
   * Expose Evemit
   * @type {Evemit}
   */
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = Evemit;
  } else {
    window.Evemit = Evemit;
  }

})();
