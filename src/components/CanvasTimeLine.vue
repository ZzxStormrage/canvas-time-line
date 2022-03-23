<!--
 * @Author: your name
 * @Date: 2022-03-08 18:33:58
 * @LastEditTime: 2022-03-18 11:23:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-vue-app/src/components/HelloWorld.vue
-->
<script setup>
import CanvasTimeLine from '../packages/canvas-time-line/index'

onMounted(() => {
  const CanvasTimeLineFn = new CanvasTimeLine('canvasTimeLine')

  //   const canvasEl = document.getElementById('canvasTimeLine')
  //   console.log('🚀 ~ file: CanvasTimeLine.vue ~ line 14 ~ onMounted ~ canvasEl', canvasEl)
  //   CanvasTimeLine('#canvasTimeLine')
})
</script>

<template>
  <canvas id="canvasTimeLine"></canvas>
</template>

<style scoped></style>
