import wpssdk from './wpssdk'

export default wpssdk

let completed = false
/**
 * 查询走的是中台还是原生wps
 * return
 * true 原生
 * false: 中台
 */
const isNative = (wps = {}) => {
  let flag = false
  if (wps.url && wps.url.indexOf('wps.cn') > -1) {
    flag = true
  }
  return flag
}

/* 监听中台保存是否完成 */
const notice = async() => {
  window.addEventListener(
    'message',
    await function({ data }) {
      if (data.msg === 'saveWpsNotice') {
        completed = data.data
        return data.data
      }
    }
  )
}

function takeLongTime() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(completed), 300)
  })
}

/* 插入文本 */
export const insertToWps = async(wps, params = {}) => {
  if (!wps) {
    console.error('请传入wps参数')
    return
  }
  if (isNative(wps)) {
    try {
      await wps.ready()
      const app = wps.WordApplication()
      // 选区对象
      const selection = await app.ActiveDocument.ActiveWindow.Selection
      const range = await selection.Range
      const start = await range.Start
      const end = await range.End
      const { bookmarks = '', text = '' } = params
      // 删除选区内容
      start < end && app.ActiveDocument.ActiveWindow.Selection.Delete(1)
      // 插入内容
      await app.ActiveDocument.ActiveWindow.Selection.InsertAfter(text)
      // 添加书签
      const appBookmarks = await app.ActiveDocument.Bookmarks
      await appBookmarks.Add({
        Name: bookmarks,
        Range: {
          Start: start,
          End: start + text.length
        }
      })
      return { result: 'success', version: 1 }
    } catch (error) {
      return { result: 'error', version: 1 }
    }
  } else {
    try {
      wps.iframe.contentWindow.postMessage({ msg: 'insertTo', data: params }, '*')
    } catch (error) {
      document.querySelector('#office-iframe').contentWindow.postMessage({ msg: 'insertTo', data: params }, '*')
    }
  }
}

/* 保存 */
export const save = async(wps) => {
  if (!wps) {
    console.error('请传入wps参数')
    return
  }
  if (isNative(wps)) {
    return await wps.save()
  } else {
    /* 中台 */
    completed = false
    try {
      wps.iframe.contentWindow.postMessage({ msg: 'saveWps', data: 'save' }, '*')
    } catch (error) {
      document.querySelector('#office-iframe').contentWindow.postMessage({ msg: 'saveWps', data: 'save' }, '*')
    }
    notice()
    let res = await takeLongTime()
    while (res === false) {
      res = await takeLongTime()
    }
    return res
  }
}

export const initWebOfficeSdk = (params = {}) => {
  const { token = '' } = params
  let wps = null
  wps = wpssdk.config(params)
  wps.setToken({
    token: token
  })
  return wps
}
