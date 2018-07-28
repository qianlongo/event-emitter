import { isValidListener, forEach } from './helpers'
class EventEmitter {
  /* eslint-disable */
  constructor () {}
  alias (name) {
    return (...args) => {
      return this[name].apply(this, args)
    }
  }

  getListeners (evt) {
    // TODO:
    let events = this._getEvents()
    let response

    if (evt instanceof RegExp) {
      forEach(events, (event, key) => {
        evt.test(key) && (response[key] = event)
      })
    } else {
      response[evt] = events[evt] || (events[evt] = [])
    }

    return response
  }
  flattenListeners (listeners) {
    return Object.keys(listeners).reduce((result, key) => {
      return result.concat(listeners[key].listener)
    }, [])
  }

  getListenersAsObject (evt) {
    let listeners = this.getListeners(evt)

    return Array.isArray(listeners) ? { evt: listeners } : listeners
  }

  addListener (evt, listener) {
    if (!isValidListener(listener)) {
      throw new TypeError('listener must be a function')
    }

    let listeners = this.getListenersAsObject(evt)
    let listenerIsWrapped = typeof listener === 'object'

    forEach(listeners, (it, key) => {
      !it.includes(listener) && it.push(listenerIsWrapped ? listener : { listener, once: false })
    })

    return this
  }

  addOnceListener (evt, listener) {
    return this.addListener(evt, {
      listener,
      once: true
    })
  }

  defineEvent (evt) {
    this.defineEvent(evt)

    return this
  }

  defineEvents (evts) {
    forEach(evts, (evt) => {
      this.defineEvent(evt)
    })

    return this
  }

  removeListener (evt, listener) {
    let listeners = this.getListenersAsObject(evt)

    forEach(listeners, (it) => {
      let i = it.indexOf(listener)

      i !== -1 && it.splice(i, 1)
    })

    return this
  }

  addListeners (evt, listeners) {
    // TODO:
    return this.manipulateListeners(false, evt, listeners)
  }

  removeListeners (evt, listeners) {
    return this.manipulateListeners(true, evt, listeners)
  }

  manipulateListeners (remove, evt, listeners) {
    let single = remove ? this.removeListener : this.addListener
    let multiple = remove ? this.removeListeners : this.addListeners

    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      forEach(evt, (listener, key) => {
        typeof listener === 'function' ? single.call(this, key, listener) : multiple.call(this, key, listener)
      })
    } else {
      forEach(listeners, (listener) => single.call(this, evt, listener))
    }

    return this
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.alias('addListener')
EventEmitter.prototype.once = EventEmitter.prototype.alias('addOnceListener')
EventEmitter.prototype.off = EventEmitter.prototype.alias('removeListener')

export default EventEmitter
