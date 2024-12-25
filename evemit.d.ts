/**
 * @name Evemit
 * @description Minimal and fast JavaScript event emitter for Node.js and front-end.
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/evemit
 * @license MIT https://github.com/Nicolab/evemit/blob/master/LICENSE
 */

declare module 'evemit' {
  class Evemit {
    /**
     * Events object.
     */
    events: Record<string, Function[]>;

    /**
     * Evemit
     *
     * @constructor
     * @api public
     */
    constructor();

    /**
     * Register a new event listener for a given event.
     *
     * @param {string}   event      Event name.
     * @param {function} fn         Callback function (listener).
     * @param {*}        [context]  Context for function execution.
     * @return {Evemit} Current instance.
     * @api public
     */
    on(event: string, fn: Function, context?: any): this;

    /**
     * Add an event listener that's only called once.
     *
     * @param {string}    event      Event name.
     * @param {function}  fn         Callback function (listener).
     * @param {*}         [context]  Context for function execution.
     * @return {Evemit} Current instance.
     * @api public
     */
    once(event: string, fn: Function, context?: any): this;

    /**
     * Emit an event to all registered event listeners.
     *
     * @param  {string} event      Event name.
     * @param  {*}      [...arg]   One or more arguments to pass to the listeners.
     * @return {bool} Indication, `true` if at least one listener was executed,
     * otherwise returns `false`.
     * @api public
     */
    emit(event: string, ...args: any[]): boolean;

    /**
     * Remove event listeners.
     *
     * @param {string}   event  The event to remove.
     * @param {function} fn     The listener that we need to find.
     * @return {Evemit} Current instance.
     * @api public
     */
    off(event: string, fn: Function): this;

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
    listeners(event?: string): Function[];
  }

  export = Evemit;
}