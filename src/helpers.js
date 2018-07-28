export const isValidListener = (listener) => {
  if (typeof listener === 'function' || listener instanceof RegExp) {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

export const forEach = (obj, cb) => {
  Array.isArray(obj) ? obj.forEach(cb) : Object.keys(obj).forEach((key) => cb(obj[key], key))
}
