export default class EventEmitter {
  /* eslint-disable */
  constructor () {}
  alias (name) {
    return (...args) => {
      return this[name].apply(this, args)
    }
  }
}
