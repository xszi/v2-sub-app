import Rwebsocket from 'reconnecting-websocket'
/**
 * 实例化WS
 */
export function initQDWS(wsUrl) {
  const ws = new Rwebsocket(wsUrl, null, { debug: false, reconnectInterval: 6000, maxRetries: 3 })
  console.info(`ws地址：${wsUrl}`)
  console.info('即将链接')
  return ws
}
/**
 * 打开监听
 * @param ws
 * @param fun
 * @returns {null}
 */
export function listnerOpen(ws, fun) {
  if (ws === undefined) {
    return null
  } else if (typeof fun === 'function') {
    // 打开回调方法
    ws.onopen = function(event) {
      console.info('即将打开')
      fun(event.data)
    }
  }
}

/**
 * 错误监听
 * @param ws
 * @param fun
 * @returns {null}
 */
export function listnerError(ws, fun) {
  if (ws === undefined) {
    return null
  } else if (typeof fun === 'function') {
    // 错误回调方法
    ws.onerror = function(event) {
      fun(event.data)
    }
  }
}
/**
 * 监听消息
 * @param ws
 * @param fun
 * @returns {null}
 */
export function listnerMessage(ws, fun) {
  if (ws === undefined) {
    return null
  } else if (typeof fun === 'function') {
    // 接收到消息的回调方法
    ws.onmessage = function(event) {
      fun(event.data)
    }
  }
}

/**
 * 关闭监听
 * @param ws
 * @param fun
 * @returns {null}
 */
export function listnerClose(ws, fun) {
  if (ws === undefined) {
    return null
  } else {
    // 关闭回调方法
    if (typeof fun === 'function') {
      ws.onclose = function() {
        fun()
      }
    }
    return null
  }
}

/**
 * 注册监听
 * @param ws
 * @param callBacks
 * @returns {null}
 */
export function registerListner(ws, callBacks) {
  if (ws == null) {
    return null
  } else {
    const open = callBacks.open || null
    const error = callBacks.error || null
    const message = callBacks.message || null
    const close = callBacks.close || null
    listnerOpen(ws, open)
    listnerError(ws, error)
    listnerMessage(ws, message)
    listnerClose(ws, close)
  }
}
