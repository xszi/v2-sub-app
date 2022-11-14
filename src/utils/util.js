
/**
 * @param {string} key
 * @returns {String | Array | Object}
 */
export function getBrowserCache(key) {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : localStorage.getItem(key)
}
/**
 * @param {string, string} (key, value)
 * @returns {String | Array | Object}
 */
export function setBrowserCache(key, value) {
  sessionStorage.setItem(key, value)
  !localStorage.getItem(key) && localStorage.setItem(key, value)
}
/**
 * @param {string} key
 * @returns {String | Array | Object}
 */
export function removeBrowserCache(key) {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}

