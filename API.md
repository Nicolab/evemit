# API doc

<a name="Evemit"></a>
## class: Evemit

  * [new Evemit()](#new_Evemit)
  * [evemit.on(event, fn, [context])](#Evemit#on)
  * [evemit.once(event, fn, [context])](#Evemit#once)
  * [evemit.emit(event, [...arg])](#Evemit#emit)
  * [evemit.off(event, fn)](#Evemit#off)
  * [evemit.listeners([event])](#Evemit#listeners)

<a name="new_Evemit"></a>
## new Evemit()
Evemit constructor.

<a name="Evemit#on"></a>
## evemit.on(event, fn, [context])
Register a new event listener for a given event.

**Params**

- event `string` - Event name.  
- fn `function` - Callback function (listener).  
- \[context\] `*` - Context for function execution.  

**Returns**: [Evemit](#Evemit) - Current instance.  

<a name="Evemit#once"></a>
## evemit.once(event, fn, [context])
Add an event listener that's only called once.

**Params**

- event `string` - Event name.  
- fn `function` - Callback function (listener).  
- \[context\] `*` - Context for function execution.  

**Returns**: [Evemit](#Evemit) - Current instance.  

<a name="Evemit#emit"></a>
## evemit.emit(event, [...arg])
Emit an event to all registered event listeners.

**Params**

- event `string` - Event name.  
- \[...arg\] `*` - One or more arguments to pass to the listeners.  

**Returns**: `bool` - Indication, `true` if at least one listener was executed,
otherwise returns `false`.

<a name="Evemit#off"></a>
## evemit.off(event, fn)
Remove event listeners.

**Params**

- event `string` - The event to remove.  
- fn `function` - The listener that we need to find.  

**Returns**: [Evemit](#Evemit) - Current instance.  

<a name="Evemit#listeners"></a>
## evemit.listeners([event])
Get a list of assigned event listeners.

**Params**

- \[event\] `string` - The events that should be listed.
If not provided, all listeners are retourned.
Use the property `Evemit.events` if you want get an object like
```
{event1: [array of listeners], event2: [array of listeners], ...}
```

**Returns**: `array`  

<a name="Evemit"></a>
# Evemit
Minimal and fast JavaScript event emitter for Node.js and front-end.

**Author**: Nicolas Tallefourtane <dev@nicolab.net>  
**License**: MIT https://github.com/Nicolab/evemit/blob/master/LICENSE  
