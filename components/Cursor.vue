<script setup lang="ts">
import vsSource from '~/assets/shader/cursorVertex.glsl'
import fsSource from '~/assets/shader/cursorFragment.glsl'

const canvas = ref()
const cursor = {
  current: { x: 0, y: 0 },
  target: { x: 0, y: 0 }
}

onMounted(() => {
  const gl: WebGL2RenderingContext = canvas.value.getContext('webgl2')

  resizeShaderCanvas(canvas.value, gl)

  const shaderProgram = createShaderProgram(gl, vsSource, fsSource)

  const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution')
  const mouseUniformLocation = gl.getUniformLocation(shaderProgram, 'u_mouse')
  const timeUniformLocation = gl.getUniformLocation(shaderProgram, 'u_time')
  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position')
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

  const radius = 50
  const segmentsCount = 40
  const angleStep = (2 * Math.PI) / segmentsCount

  const render = (time = 0) => {
    time /= 1000

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    cursor.current.x = lerp(cursor.current.x, cursor.target.x, 0.05)
    cursor.current.y = lerp(cursor.current.y, cursor.target.y, 0.05)

    gl.uniform2f(resolutionUniformLocation, canvas.value.width, canvas.value.height)
    gl.uniform2f(mouseUniformLocation, cursor.current.x, cursor.current.y)
    gl.uniform1f(timeUniformLocation, time)

    const vertices = [cursor.current.x + 0.05, cursor.current.y - 0.05]

    for (let i = 0; i <= segmentsCount; i++) {
      const angle = i * angleStep
      const x = (Math.cos(angle) / radius) + cursor.current.x + 0.05
      const y = (Math.sin(angle) / radius * (window.innerWidth / window.innerHeight)) + cursor.current.y - 0.05
      vertices.push(x, y)
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, segmentsCount + 2)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX
    const mouseY = event.clientY
    cursor.target.x = (mouseX / window.innerWidth) * 2 - 1
    cursor.target.y = (mouseY / window.innerHeight) * -2 + 1
  })

  window.addEventListener('resize', () => debounce(resizeShaderCanvas(canvas.value, gl)))
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
@use '~/assets/styles/mixins' as *;

canvas {
  position: fixed;
  inset: 0;
  z-index: var(--zi-cursor);
  display: none;
  width: 100%;
  height: 100%;
  pointer-events: none;

  @include has-hover {
    display: block;
  }
}
</style>
