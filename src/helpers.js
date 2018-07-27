export const isValidListener = (listener) => {
  if (typeof listener === 'function' || listener instanceof RegExp) {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

export const forEach = (array, cb) => {
  Array.isArray(array) ? array.forEach(cb) : Object.keys(array).forEach((key) => cb(array[key], key))
}
