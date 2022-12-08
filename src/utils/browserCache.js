/**
 * @param {string} key
 * @returns {String | Array | Object}
 */
export function removeBrowserCache(key) {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
}

