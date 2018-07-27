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
  if (Array.isArray(array)) {
    array.forEach((it, i) => {
      cb(it, i)
    })
  } else {
    Object.keys(array).forEach((key) => {
      cb(array[key], key)
    })
  }
}
