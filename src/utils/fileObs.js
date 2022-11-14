import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'

export function calculateMd5(file) {
  /**
   * 使用指定的算法计算hash值
   */
  function hashFileInternal(file, alog) {
    // 指定块的大小，这里设置为20MB,可以根据实际情况进行配置
    const chunkSize = 20 * 1024 * 1024
    let promise = Promise.resolve()
    // 使用promise来串联hash计算的顺序。因为FileReader是在事件中处理文件内容的，必须要通过某种机制来保证update的顺序是文件正确的顺序
    for (let index = 0; index < file.size; index += chunkSize) {
      promise = promise.then(() => hashBlob(file.slice(index, index + chunkSize)))
    }

    /**
     * 更新文件块的hash值
     */
    function hashBlob(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = ({ target }) => {
          const wordArray = CryptoJs.lib.WordArray.create(target.result)
          // 增量更新计算结果
          alog.update(wordArray)
          resolve()
        }
        reader.readAsArrayBuffer(blob)
      })
    }

    // 使用promise返回最终的计算结果
    return promise.then(() => encHex.stringify(alog.finalize()))
  }

  // 同时计算文件的sha256和md5,并使用promise返回
  return new Promise(resolve => {
    hashFileInternal(file, CryptoJs.algo.MD5.create()).then(res => {
      resolve(res)
    })
  })
}
