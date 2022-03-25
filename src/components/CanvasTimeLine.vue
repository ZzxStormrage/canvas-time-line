<!--
 * @Author: your name
 * @Date: 2022-03-08 18:33:58
 * @LastEditTime: 2022-03-25 17:52:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-vue-app/src/components/HelloWorld.vue
-->
<script setup>
import CanvasTimeLine from '../packages/canvas-time-line/index'

let CanvasTimeLineFn = null

onMounted(() => {
  let canvasOptions = {
    bgColor: '#ccc'
  }
  CanvasTimeLineFn = new CanvasTimeLine('canvasTimeLine', canvasOptions)
})

const scrollHandel = (e) => {
  let scrollLeft = e.target.scrollLeft
  CanvasTimeLineFn.moveDraw(scrollLeft)
}
</script>

<template>
  <canvas id="canvasTimeLine"></canvas>
  <div class="canvas-wrap" @scroll="scrollHandel">
    <div class="content"></div>
  </div>
</template>

<style scoped lang="scss">
.canvas-wrap {
  overflow: hidden;
  overflow-x: auto;
  width: 1000px;
  height: 300px;
  position: relative;

  #canvasTimeLine {
    position: absolute;
    top: 0;
    left: 0;
  }

  .content {
    width: 10000px;
    height: 20px;
    background-color: #ccc;
  }
}
</style>
