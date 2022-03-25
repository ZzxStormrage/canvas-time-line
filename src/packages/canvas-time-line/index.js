/*
 * @Author: your name
 * @Date: 2022-03-17 15:09:45
 * @LastEditTime: 2022-03-25 16:21:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /canvas-time-line/src/packages/canvas-time-line/canvas-time-line.js
 */

const LING_H = 8 // 段落刻度尺高度
const LING_W = 1 // 段落刻度尺宽度
const S_LING_H = 6 // 刻度尺高度
const LING_COLOR = '#979797' // 段落线颜色
const S_LING_COLOR = '#f0f0f0' // 刻度线颜色
const CANVAS_COLOR = '#fff' // color 背景颜色
const DATE_COLOR = '#404040' // color 背景颜色
const FOND_TOP = 20 // 距离顶部距离
const FOND_STYLE = '12px Arial' // 字体

const CANVAS_W = 1400 // canvas 宽
const CANVAS_H = 50 // canvas 高

const BLOCK_TIME_MS = 100 // 每格多少毫秒
const BLOCK_WIDTH = 10 // 每个的格子宽度
const SCROLL_LEFT = 0 // 默认滚动位置
const START_TIME_MS = 0 // 开始毫秒数
const EDN_TIME_MS = 600000 // 结束时间毫秒数
class CanvasTimeLine {
  /**
   * @param {id} canvasElId
   * @param {Object} option
   */
  constructor(canvasElId, option = {}) {
    this.canvas = document.getElementById(canvasElId)

    this.options = Object.assign(option, {
      canvasW: CANVAS_W,
      canvasH: CANVAS_H,
      lineH: LING_H,
      lineW: LING_W,
      lingColor: LING_COLOR,
      canvasColor: CANVAS_COLOR,
      dateColor: DATE_COLOR,
      sLineH: S_LING_H,
      sLingColor: S_LING_COLOR,
      fondTop: FOND_TOP,
      scrollLeft: SCROLL_LEFT,
      blockTimeMs: BLOCK_TIME_MS,
      blockWidth: BLOCK_WIDTH,
      startTimeMs: START_TIME_MS,
      endTimeMs: EDN_TIME_MS,
      fondStyle: FOND_STYLE
    })

    // 每像素多少毫秒
    this.prePxMs = 0
    this.drawData = []
    this.init()

    this.moveDraw = this.moveDraw.bind(this)
  }

  init() {
    this.setBaseData()

    let { canvasW, canvasH, canvasColor, scrollLeft, blockWidth } = this.options

    this.ctx = this.canvas.getContext('2d')
    const ratio = this.getPixelRatio(this.ctx)

    this.canvas.width = canvasW * ratio
    this.canvas.height = canvasH * ratio
    this.canvas.style.width = `${canvasW}px`
    this.canvas.style.height = `${canvasH}px`

    // 然后将画布缩放，将图像放大两倍画到画布上
    this.ctx.scale(ratio, ratio)
    this.ctx.fillStyle = canvasColor
    this.ctx.fillRect(0, 0, canvasW, canvasH)

    const start = Math.ceil(scrollLeft / blockWidth)
    const end = Math.ceil(canvasW / blockWidth)
    this.draw(start, end)
  }

  draw(startIndex = 0, endIndex = 140) {
    let { blockWidth, fondTop, dateColor, fondStyle, canvasW, canvasH } = this.options
    const start = Math.max(startIndex - 10, 0)
    const end = Math.min(endIndex + 10, this.drawData.length)

    for (let i = start; i < end; i++) {
      const { isBlock, beginX, beginY, endX, endY, color, width } = this.drawData[i]
      const beginXTemp = beginX - this.scrollLeft
      const endXTemp = beginXTemp
      this.drawLine(beginXTemp, beginY, endXTemp, endY, color, width)
      let text = this.msToSecond(this.prePxMs * blockWidth * i)
      isBlock && this.drawText(text, beginXTemp, endY - fondTop, dateColor, fondStyle)
    }
  }

  drawLine(beginX, beginY, endX, endY, color, width) {
    this.ctx.beginPath()
    this.ctx.moveTo(beginX + 0.5, beginY) // 加0.5 为了实现 一像素 线的方法
    this.ctx.lineTo(endX + 0.5, endY)
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.stroke()
  }

  moveDraw(scrollLeft = 0) {
    this.scrollLeft = scrollLeft

    let { blockWidth, canvasH, canvasW } = this.options
    const start = Math.ceil(scrollLeft / blockWidth)
    const end = Math.ceil(canvasW / blockWidth)
    this.ctx.clearRect(0, 0, canvasW, canvasH)
    this.draw(start, start + end)
  }

  setBaseData() {
    let { blockWidth, startTimeMs, endTimeMs, blockTimeMs, canvasH, lineH, lineW, slineH } =
      this.options

    this.prePxMs = blockTimeMs / blockWidth

    const durationMs = endTimeMs - startTimeMs
    const blockNum = Math.ceil(durationMs / blockTimeMs)

    for (let i = 0; i < blockNum; i++) {
      const isBlock = i % 10 === 0
      const lineHTemp = isBlock ? lineH : slineH
      const beginX = blockWidth * i

      this.drawData.push({
        isBlock,
        color: LING_COLOR,
        beginX,
        beginY: canvasH,
        endX: beginX,
        endY: canvasH - lineHTemp,
        width: lineW
      })
    }
  }

  drawText(text, x, y, textColor = '#000', fondStyle) {
    this.ctx.fillStyle = textColor
    this.ctx.font = fondStyle
    this.ctx.fillText(text, x, y)
  }

  msToSecond(s) {
    var result = '00:00:00'

    var minute, second, ms

    if (s > 0) {
      second = Math.floor(s / 60000)
      if (second < 10) {
        second = '0' + second
      }

      minute = Math.floor(s / 1000 - second * 60)
      if (minute < 10) {
        minute = '0' + minute
      }

      ms = (Math.floor(parseFloat(s) - second * 60000 - minute * 1000) / 10).toFixed()
      if (ms < 10) {
        ms = '0' + ms
      }
      result = second + ':' + minute + '.' + ms
    }

    return result
  }
  getPixelRatio(context) {
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1

    return (window.devicePixelRatio || 1) / backingStore
  }
}
export default CanvasTimeLine
