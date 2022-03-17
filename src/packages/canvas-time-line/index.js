/*
 * @Author: your name
 * @Date: 2022-03-17 15:09:45
 * @LastEditTime: 2022-03-17 17:41:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /canvas-time-line/src/packages/canvas-time-line/canvas-time-line.js
 */

const LING_H = 8 // 段落刻度尺高度
const S_LING_H = 6 // 刻度尺高度
const LING_COLOR = '#979797' // 段落线颜色
const S_LING_COLOR = '#f0f0f0' // 刻度线颜色
const CANVAS_COLOR = '#FFF' // color 背景颜色
const FOND_TOP = 20 //

const CANVAS_W = 1400 // canvas 宽
const CANVAS_H = 50 // canvas 高

const BLOCK_TIME = 6000 // 每格多少毫秒
const BLOCK_WIDTH = 12 // 每小格多少像素

const SCROLL_LEFT = 0 // 默认滚动位置

class CanvasTimeLine {
  /**
   * @param {id} canvasElId
   */
  constructor(canvasElId, option = {}) {
    this.canvas = document.getElementById('canvasElId')

    this.options = Object.assign(option, {
      canvasW: CANVAS_W,
      canvasH: CANVAS_H,
      lingH: LING_H,
      lingColor: LING_COLOR,
      canvasColor: CANVAS_COLOR,
      sLingH: S_LING_H,
      sLingColor: S_LING_COLOR,
      fondTop: FOND_TOP,
      blockTime: BLOCK_TIME,
      blockWidth: BLOCK_WIDTH,
      scrollLeft: SCROLL_LEFT
    })

    this.init()
  }

  init() {
    this.ctx = this.canvas.getContext('2d')
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || 1
    const ratio = devicePixelRatio / backingStoreRatio

    this.canvas.width = this.options.canvasW * ratio
    this.canvas.height = this.options.canvasH * ratio
    this.canvas.style.width = `${this.options.canvasW}px`
    this.canvas.style.height = `${this.options.canvasH}px`
    // 然后将画布缩放，将图像放大两倍画到画布上
    this.ctx.scale(ratio, ratio)

    this.ctx.fillStyle = this.options.canvasColor
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
  }

  drawLine(beginX, beginY, endX, endY, color, width) {
    this.ctx.beginPath()
    this.ctx.moveTo(beginX + 0.5, beginY) // 加0.5 为了实现 一像素 线的方法
    this.ctx.lineTo(endX + 0.5, endY)
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.stroke()
  }

  drawText(text, x, y, textColor = '#404040') {
    this.ctx.fillStyle = textColor
    this.ctx.fillText(text, x, y)
  }
}
export default new CanvasTimeLine()
