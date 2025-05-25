<template>
  <div class="layout">
    <canvas
      ref="canvas"
      :width="size"
      :height="size"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      @mousemove="handleMouseMove"
    ></canvas>
    <div class="button-group">
      <button @click="submit">Send to Backend</button>
      <button @click="initializeGrid">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'
import { useUserStore } from '@/stores/userStore';

const serviceStore = useServiceStore();
const userStore = useUserStore()

const pixelSize = 20
const gridSize = 8
const size = pixelSize * gridSize

const isDrawing = ref(false)
const canvas = ref(null)
const ctx = ref(null)
// 2D grid for pixel states
const pixels = ref(null) 

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  initializeGrid()
})

function handleMouseDown(e) {
  isDrawing.value = true
  updatePixel(e)
}

function handleMouseUp() {
  isDrawing.value = false
}

function handleMouseMove(e) {
  if (isDrawing.value) {
    updatePixel(e)
  }
}

function initializeGrid() {
  pixels.value = Array.from({ length: 8 }, () => Array(8).fill(0))
  drawGrid()
}

function updatePixel(e) {
  const rect = canvas.value.getBoundingClientRect()
  const x = Math.floor((e.clientX - rect.left) / pixelSize)
  const y = Math.floor((e.clientY - rect.top) / pixelSize)

  // Prevent index out of bounds
  if (x < 0 || x >= 8 || y < 0 || y >= 8) return

  pixels.value[y][x] = 16  // black
  drawGrid()
}

function drawGrid() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.value.fillStyle = pixels.value[y][x] ? 'black' : 'white'
      ctx.value.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      ctx.value.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }
  }
}

function submit() {
  const data = pixels.value.flat().join(';')
  serviceStore.makeServiceRequest('2', {
    pixels: data
  }, userStore);
}
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: center; /* center items horizontally */  
  align-items: flex-start; /* align items at the top */
  gap: 20px; /* space between canvas and buttons */
}

.button-group {
  display: flex;
  flex-direction: column; /* stack buttons vertically */
  gap: 20px;
}
</style>