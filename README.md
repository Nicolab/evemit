# Evemit

[![Actual version published on NPM](https://badge.fury.io/js/evemit.png)](https://www.npmjs.org/package/evemit)
[![npm module downloads per month](http://img.shields.io/npm/dm/evemit.svg)](https://www.npmjs.org/package/evemit)

Minimal and fast JavaScript event emitter for Node.js and front-end.
Only 1kb minified (554 bytes gzipped).


## Getting started

### Install

Via `NPM`
```shell
npm install evemit --save
```

Or download the [evemit.min.js](evemit.min.js) file.

If `Evemit` is used in CommonJS environment (Node.js, Browserify, Webpack, ...),
it is exposed as module with `module.exports`.

So in CommonJS, _evemit_ is not exposed in the global scope (even on client side) :)
```js
var ev = require('evemit');

// true (it's the constructor)
console.log(typeof ev === 'function');

// undefined, even on front-end with Browserify, Webpack, ...
console.log(typeof Evemit);
```

Basic usage (without CommonJS)
```js
// true
console.log(typeof Evemit === 'function');

// true
console.log(typeof window.Evemit === 'function');
```

### Usage

```js
var Evemit = require('evemit');

// Or if you are not in an environment CommonJS (Node.js, Browserify, Webpack, ...)
// uses directly `Evemit`, without `var Evemit = require('evemit')`

var obj = new Evemit();

obj.on('say-hello', function(hello) {
  console.log(hello); // Hello World!
});

obj.emit('say-hello', 'Hello World!');
```


## API

See the complete [API doc](API.md).

### Evemit.on({string} event, {function} listener, {mixed} [context])

Add a listener.

```js
obj.on('say-hello', function(hello) {
  console.log(hello); // Hello World!
});

obj.emit('say-hello', 'Hello World!');
```

### Evemit.once({string} event, {function} listener, {mixed} [context])

Listen once

```js
function myCallback(data) {
  console.log(data.hello); // Hello 1
}

// Add listener, defined to be triggered "once"
obj.once('say-hello', myCallback);

// myCallback() is invoked and the listener is removed
obj.emit('say-hello', {
  hello: 'Hello 1'
});

// myCallback() is not called because it is no longer listening on this event
obj.emit('say-hello', {
  hello: 'Hello 2'
});
```

### Evemit.emit({string} event, {mixed} [...arg])

Emit an event

```js
obj.emit('ping');
```

With arguments passed to the listeners
```js
obj.emit('ping', 'arg1', 'arg2', {an: 'object'});
```

### Evemit.off({string} event, {function} listener)

Remove a listener

```js
function myCallback(data) {
  // some code ...
}

// add
a.on('say-hello', myCallback);

// remove
a.off('say-hello', myCallback);
```

### Evemit.listeners({string} [event])

Get all listeners
```js
// Returns an array containing all listeners
obj.listeners();
```

Count all listeners
```js
// Returns a number.
obj.listeners().length;
```

Get all listeners of a given event
```js
// Returns an array of listeners
obj.listeners('say-hello');
```

Count all listeners of a given event
```js
obj.listeners('say-hello').length;
```

The methods of the `Array` object can be used to manage the listeners.

Example
```js
// reverse the order of the listeners execution
obj.listeners('my-event').reverse();

// slices
obj.listeners('my-event').slice(1, 3);

// Removes the first listener of the stack, and returns that listener
var firstListener = obj.listeners('my-event').shift();

// Removes the last listener of the stack, and returns that listener
var lastListener = obj.listeners('my-event').pop();

// ...
```

Use the property `obj.events` if you want to get an object like
```
{event1: [array of listeners], event2: [array of listeners], ...}
```


## Unit tests

`evemit` is unit tested with [Unit.js](http://unitjs.com).

Run the tests
```shell
cd node_modules/evemit

npm test
```

To execute the tests on client side, download the `test` directory and go on _test/index.html_ file with your browser.


## LICENSE

[MIT](https://github.com/Nicolab/evemit/blob/master/LICENSE) (c) 2014, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |