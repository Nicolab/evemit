/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @name Unit tests of evemit
	 * @author Nicolas Tallefourtane <dev@nicolab.net>
	 * @link https://github.com/Nicolab/evemit
	 * @license MIT https://github.com/Nicolab/evemit/blob/master/LICENSE
	 */

	'use strict';

	var test   = __webpack_require__(1);
	var assert = test.assert;
	var Evemit = __webpack_require__(2);
	var ev;

	describe('Evemit', function() {

	  beforeEach(function() {

	    ev = new Evemit();

	    // should be never called
	    ev.on('never-called', function() {
	      throw new Error('"nerver-called" event is called.');
	    });
	  });

	  afterEach(function() {
	    ev = null;
	  });

	  //------------------------------------------------------------------------//

	  it('should be a class', function() {

	    test
	      .function(Evemit)
	        .hasName('Evemit')

	      .object(ev)
	        .isInstanceOf(Evemit)

	      .object(new Evemit())
	        .isInstanceOf(Evemit)
	        .isNotEqualTo(ev)
	    ;
	  });

	  it('`on()` create a listener', function() {

	    var listener = test.spy();
	    var listener2 = test.spy();

	    ev.on('test', listener);
	    ev.on('test', listener2);

	    test
	      .array(ev.events.test)
	        .hasLength(2)

	      .object(ev.events)
	        .hasOwnProperties(['test', 'never-called'])
	    ;

	    ev.emit('test', 'a');
	    ev.emit('test', 'b');

	    test
	      .array(ev.events.test)
	        .hasLength(2)

	      .object(ev.events)
	        .hasOwnProperties(['test', 'never-called'])
	    ;

	    // listener 1
	    assert(listener.calledTwice);
	    assert(listener.firstCall.calledWith('a'));
	    assert(listener.secondCall.calledWith('b'));

	    // listener 2
	    assert(listener2.calledTwice);
	    assert(listener2.firstCall.calledWith('a'));
	    assert(listener2.secondCall.calledWith('b'));
	  });

	  it('`once()` create a listener executed once', function() {
	    var listener1          = test.spy();
	    var listener2          = test.spy();
	    var listener3          = test.spy();
	    var listenerDuplex     = test.spy();
	    var listenerDuplexOnce = test.spy();
	    var listenerOnce       = test.spy();

	    var checkListener = function (spy) {
	      assert(spy.callCount === 3);
	      assert(spy.getCall(0).calledWith('a'));
	      assert(spy.getCall(1).calledWith('b'));
	      assert(spy.getCall(2).calledWith('d'));
	    };

	    ev.on('test', listener1);
	    ev.once('test', listenerOnce);
	    ev.on('test', listener2);
	    ev.once('test-duplex', listenerDuplexOnce);
	    ev.on('test-duplex', listenerDuplex);
	    ev.on('test', listener3);

	    test
	      .object(ev.events)
	        .hasOwnProperties(['test', 'test-duplex', 'never-called'])

	      .array(ev.events.test)
	        .hasLength(4)

	      .array(ev.events['test-duplex'])
	        .hasLength(2)
	    ;

	    ev.emit('test', 'a');
	    ev.emit('test', 'b');
	    ev.emit('test-duplex', 'c');
	    ev.emit('test', 'd');
	    ev.emit('test-duplex', 'e');

	    test
	      .object(ev.events)
	        .hasOwnProperties(['test', 'test-duplex', 'never-called'])

	      .array(ev.events.test)
	        .hasLength(3)

	      .array(ev.events['test-duplex'])
	        .hasLength(1)
	    ;

	    // listener once
	    assert(listenerOnce.calledOnce);
	    assert(listenerOnce.calledWith('a'));

	    assert(listenerDuplexOnce.calledOnce);
	    assert(listenerDuplexOnce.calledWith('c'));

	    // listener of `test`
	    checkListener(listener1);
	    checkListener(listener2);
	    checkListener(listener3);

	    // listener of `test-duplex`
	    assert(listenerDuplex.callCount === 2);
	    assert(listenerDuplex.getCall(0).calledWith('c'));
	    assert(listenerDuplex.getCall(1).calledWith('e'));
	  });

	  it('`emit()` trigger an event', function() {

	    var listener     = test.spy();
	    var listenerOnce = test.spy();

	    ev.on('ping', listener);
	    ev.once('ping', listenerOnce);
	    ev.emit('ping');

	    // listener
	    assert(listener.calledOnce);
	    assert(listener.getCall(0).args.length === 0);

	    // listener once
	    assert(listenerOnce.calledOnce);
	    assert(listenerOnce.getCall(0).args.length === 0);
	  });

	  it('`emit()` with arguments', function() {

	    var listener     = test.spy();
	    var listenerOnce = test.spy();

	    ev.on('ping', listener);
	    ev.once('ping', listenerOnce);

	    // test each step of the optimization
	    // of the arguments resolution in the method emit()
	    test
	      .case('1 argument', function() {

	        ev.emit('ping', 1);

	        // listener
	        assert(listener.calledOnce);
	        assert(listener.calledWith(1));
	        assert(listener.getCall(0).args.length === 1);

	        // listener once
	        assert(listenerOnce.calledOnce);
	        assert(listenerOnce.calledWith(1));
	        assert(listenerOnce.getCall(0).args.length === 1);
	      })

	      .case('2 arguments', function() {

	        ev.emit('ping', 1, 'a');

	        // listener
	        assert(listener.getCall(0).calledWith(1));
	        assert(listener.getCall(0).args.length === 1);

	        assert(listener.getCall(1).calledWith(1, 'a'));
	        assert(listener.getCall(1).args.length === 2);

	        // listener once: re-check
	        assert(listenerOnce.calledOnce);
	        assert(listenerOnce.calledWith(1));
	        assert(listenerOnce.getCall(0).args.length === 1);
	      })

	      .case('3 arguments', function() {

	        var obj = { hello: 'World' };

	        ev.emit('ping', 0, obj, undefined);

	        // listener
	        assert(listener.getCall(2).calledWith(0, obj, undefined));
	        assert(listener.getCall(2).args.length === 3);

	        // check the reference
	        // because Sinon.js does not check with strict equality (===)
	        assert(listener.getCall(2).args[1] === obj);
	      })

	      .case('4 arguments', function() {

	        function fn() {}

	        ev.emit('ping', undefined, 'a', { hello: 'World' }, fn);

	        // listener
	        assert(listener.getCall(3).calledWith(undefined, 'a', { hello: 'World' }, fn));
	        assert(listener.getCall(3).args.length === 4);

	        // check the reference
	        // because Sinon.js does not check with strict equality (===)
	        assert(listener.getCall(3).args[3] === fn);
	      })

	      .case('5 arguments', function() {

	        function fn() {}
	        var arr = [1, 2, 3, fn];

	        ev.emit('ping', { hello: 'World' }, null, false, fn, arr);

	        // listener
	        assert(listener.getCall(4).calledWith({ hello: 'World' }, null, false, fn, arr));
	        assert(listener.getCall(4).args.length === 5);

	        // check the reference
	        // because Sinon.js does not check with strict equality (===)
	        assert(listener.getCall(4).args[4] === arr);

	        // for the fun
	        assert(listener.getCall(4).args[3] === fn);
	      })

	      .case('6 arguments', function() {

	        function fn() {}
	        var arr = [1, 2, 3, fn];

	        ev.emit('ping', fn, void 0, arr, 1, 'a', undefined);

	        // listener
	        assert(listener.getCall(5).calledWith(fn, void 0, arr, 1, 'a', undefined));
	        assert(listener.getCall(5).args.length === 6);
	      })
	    ;
	  });

	  it('`listeners(event)` returns all listeners of a given event', function() {
	    var a = function(){};
	    var b = function(){};
	    var c = function(){};

	    ev.on('hello', a);
	    ev.once('hello', b);
	    ev.on('hello', c);
	    ev.on('hello2', c);

	    test
	      .given(function() {
	        test
	          .object(ev.events)
	            .hasOwnProperties(['hello', 'hello2', 'never-called'])

	          .number(ev.listeners('never-called').length)
	            .isIdenticalTo(1)

	          .number(ev.listeners('hello').length)
	            .isIdenticalTo(ev.events.hello.length)
	            .isNotEqualTo(ev.events.hello2.length)
	            .isNotEqualTo(ev.listeners().length)
	            .isNotEqualTo(ev.listeners('hello2').length)

	          .array(ev.listeners('hello'))
	            .hasLength(3)
	            .isNotEqualTo(ev.listeners('hello2'))

	          .array(ev.listeners('hello2'))
	            .hasLength(1)

	          .function(ev.listeners('hello')[0])
	            .isIdenticalTo(a)
	            .isNotIdenticalTo(b)
	            .isNotIdenticalTo(c)

	          .function(ev.listeners('hello')[1])
	            .isIdenticalTo(b)

	          .function(ev.listeners('hello')[2])
	            .isIdenticalTo(c)
	        ;
	      })

	      .when(function(){
	        ev.emit('hello', {});
	        ev.emit('hello', {});
	      })

	      .then(function() {
	        test
	          .object(ev.events)
	            .hasOwnProperties(['hello', 'hello2', 'never-called'])

	          .number(ev.listeners('never-called').length)
	            .isIdenticalTo(1)

	          .number(ev.listeners('hello').length)
	            .isIdenticalTo(ev.events.hello.length)
	            .isNotEqualTo(ev.events.hello2.length)
	            .isNotEqualTo(ev.listeners().length)
	            .isNotEqualTo(ev.listeners('hello2').length)

	          .array(ev.listeners('hello'))
	            .hasLength(2)
	            .isIdenticalTo(ev.events.hello.valueOf())
	            .isNotEqualTo(ev.listeners())
	            .isNotEqualTo(ev.listeners('hello2'))
	            .isNotEqualTo(ev.listeners('never-called'))

	          .array(ev.listeners('hello2'))
	            .hasLength(1)

	          .function(ev.listeners('hello')[0])
	            .isIdenticalTo(a)
	            .isNotEqualTo(c)

	          // `b` is removed because once(),
	          // so the listeners stack for `hello` event is re-indexed
	          .function(ev.listeners('hello')[1])
	            .isIdenticalTo(c)
	            .isIdenticalTo(ev.listeners('hello2')[0])
	            .isNotEqualTo(a)
	        ;
	      })
	    ;
	  });

	  it('`listeners()` returns all listeners', function() {
	    var a = function(){};
	    var b = function(){};
	    var c = function(){};

	    ev.on('ping1', a);
	    ev.once('ping1', b);
	    ev.on('ping1', c);

	    ev.on('ping2', a);
	    ev.on('ping2', b);

	    ev.on('ping3', a);
	    ev.once('ping3', b);
	    ev.on('ping3', c);

	    test
	      .array(ev.listeners())
	        .isNotEqualTo(ev.events)
	        .hasLength(9) // 8 + 1 (`never-called` defined in the beforeEach())

	      .number(ev.listeners().length)
	        .isIdenticalTo(function() {
	          var evs = ev.events;
	          var ltn = [];

	          for(var e in evs) {
	            ltn = ltn.concat(evs[e].valueOf());
	          }

	          return ltn.length;
	        }.call())
	        .isNotEqualTo(ev.events.length)
	    ;
	  });

	  it('`off` remove a listener', function(){

	    var a = function(){};
	    var b = function(){};
	    var c = function(){};

	    ev.on('hello', a);
	    ev.once('hello', b);
	    ev.on('hello', c);

	    ev.on('ping', a);
	    ev.once('ping', b);
	    ev.on('ping', c);

	    test
	      .given(function(){
	        test
	          .number(ev.listeners().length)
	            .isIdenticalTo(7) // 6 + 1 (`never-called` defined in the beforeEach())

	          .array(ev.listeners('hello'))
	            .hasLength(3)

	          .array(ev.listeners('ping'))
	            .hasLength(3)
	        ;
	      })

	      .case('remove one listener of "ping"', function(){

	        test
	          .object(ev.off('ping', a))
	            .isInstanceOf(Evemit)
	            .isIdenticalTo(ev)

	          .number(ev.listeners().length)
	            .isIdenticalTo(6) // 5 + 1 (`never-called` defined in the beforeEach())

	          .array(ev.listeners('hello'))
	            .hasLength(3)
	            .hasValues([a, b, c])

	          .array(ev.listeners('ping'))
	            .hasLength(2)
	            .hasValues([b, c])
	        ;
	      })

	      .case('remove one listener of "hello"', function(){

	        test
	          .object(ev.off('hello', c))
	            .isInstanceOf(Evemit)
	            .isIdenticalTo(ev)

	          .number(ev.listeners().length)
	            .isIdenticalTo(5) // 4 + 1 (`never-called` defined in the beforeEach())

	          .array(ev.listeners('hello'))
	            .hasLength(2)
	            .hasValues([a, b])

	          .array(ev.listeners('ping'))
	            .hasLength(2)
	            .hasValues([b, c])
	        ;
	      })

	      .when(function() {
	        ev.emit('hello', {});
	      })

	      .then(function() {
	        test
	          .number(ev.listeners().length)
	            .isIdenticalTo(4) // 3 + 1 (`never-called` defined in the beforeEach())

	          .array(ev.listeners('hello'))
	            .hasLength(1)

	          .function(ev.listeners('hello')[0])
	            .isIdenticalTo(a)

	          .array(ev.listeners('ping'))
	            .hasValues([b, c])
	        ;
	      })
	    ;
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = unitjs;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	      if      (aLn === 0) {  fn.call(fn._E_ctx);                          }
	      else if (aLn === 1) {  fn.call(fn._E_ctx, arg1);                    }
	      else if (aLn === 2) {  fn.call(fn._E_ctx, arg1, arg2);              }
	      else if (aLn === 3) {  fn.call(fn._E_ctx, arg1, arg2, arg3);        }
	      else if (aLn === 4) {  fn.call(fn._E_ctx, arg1, arg2, arg3, arg4);  }
	      else                {  fn.apply(fn._E_ctx, args);                   }
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


/***/ }
/******/ ])