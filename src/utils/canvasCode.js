
/**
 * @returns {Object} imagInfo 节点
 * const imageInfo = {
        scale: 0.28,  // 图片大小缩放
        url: item.qrLink, // 图片url
        text: item.name  // 二维码名字
        fontSize:14px,  // 文字大小
        fontColor: '#111111' // 文字颜色
        lineHeight:20, // number 文字行高
      }
    @returns {Object} imagInfo 节点
 * const canvasInfo = {
        canvas: canvas,  // dom 节点
        width: 120,  // 画布宽度
        height: 152  // 画布高度
      }
 */
export function generatePicture(canvasInfo, imageInfo) {
  const canvas = canvasInfo.canvas
  const context = canvas.getContext('2d') // 创建画布
  const img = new Image() // 所以创建图片标签
  img.src = imageInfo.url
  img.setAttribute('crossOrigin', 'anonymous') // 解决图片跨域问题,也要放到赋值前，否ze大部分浏览器会报错
  img.onload = () => { // 绘制图片
    // 图片名称
    const text = imageInfo.text
    // 设施字体大小
    context.font = imageInfo.fontSize + ' Arial'
    // 画布高度
    const canvasHeight = context.measureText(text).width < canvasInfo.width - 30 ? canvasInfo.height : Number(canvasInfo.height) + 30
    canvas.setAttribute('height', canvasHeight)
    // 解决画布默认黑色背景问题，重新绘制一个白色背景的画布
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvasInfo.width, canvas.height)
    // 绘制图片，按照样式比例狂傲缩放
    context.drawImage(img, 0, 0, img.width * imageInfo.scale, img.height * imageInfo.scale)
    // 设施字体大小
    context.font = imageInfo.fontSize + ' Arial'
    // 距离左边的位置
    var left = (canvas.width / 2) - (context.measureText(text).width / 2)
    // 距离上边的位置 (图片高-文字距离图片底部的距离)
    var top = canvas.height - 12
    // 文字颜色
    context.fillStyle = imageInfo.fontColor
    // 文字在画布的位置，超出换行显示
    if (context.measureText(text).width < canvas.width) {
      context.fillText(text, left, top)
    } else {
      context.textAlign = 'center'
      drawtext(context, text, canvas.width / 2, canvas.width, canvas.width, imageInfo.lineHeight) // 绘制文字并换行
    }
    // 将画布合成一张图
    // this.image = canvas.toDataURL('image/png', 1)
  }
}

// 文字换行
function drawtext(ctx, t, x, y, w, lineHeight) {
  // 参数说明
  // ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度
  const chr = t.split('')
  let temp = ''
  const row = []
  for (let a = 0; a < chr.length; a++) {
    if (ctx.measureText(temp).width < w && ctx.measureText(temp + (chr[a])).width <= w) {
      temp += chr[a]
    } else {
      row.push(temp)
      temp = chr[a]
    }
  }
  row.push(temp)
  for (let b = 0; b < row.length; b++) {
    ctx.fillText(row[b], x, y + (b + 1) * lineHeight) // 每行字体y坐标间隔20-就是行间距
  }
}
