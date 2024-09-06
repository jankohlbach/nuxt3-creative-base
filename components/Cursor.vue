<script setup lang="ts">
import vsSource from '~/assets/shader/cursorVertex.glsl'
import fsSource from '~/assets/shader/cursorFragment.glsl'

const { cursorPos, setCursorPosCurrent, setCursorPosTarget } = useCursor()

const canvas = ref()

onMounted(() => {
  // cursor logic
  let raf: number | null

  window.addEventListener('mousemove', (event) => {
    setCursorPosTarget(event.clientX, event.clientY)

    if (!raf) {
      raf = requestAnimationFrame(calcLerp)
    }
  })

  const calcLerp = () => {
    const x = lerp(cursorPos.value.current.x, cursorPos.value.target.x, 0.05)
    const y = lerp(cursorPos.value.current.y, cursorPos.value.target.y, 0.05)

    setCursorPosCurrent(x, y)

    const delta = Math.sqrt(
      ((cursorPos.value.target.x - cursorPos.value.current.x) ** 2)
      + ((cursorPos.value.target.y - cursorPos.value.current.y) ** 2),
    )

    if (delta < 0.001 && raf) {
      cancelAnimationFrame(raf)
      raf = null
      return
    }

    raf = requestAnimationFrame(calcLerp)
  }

  // canvas
  const gl: WebGL2RenderingContext = canvas.value.getContext('webgl2')

  resizeShaderCanvas(canvas.value, gl)

  const shaderProgram = createShaderProgram(gl, vsSource, fsSource)

  const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution')
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

    gl.uniform2f(resolutionUniformLocation, canvas.value.width, canvas.value.height)
    gl.uniform1f(timeUniformLocation, time)

    const normalizedX = cursorPos.value.current.x * 2 - 1
    const normalizedY = cursorPos.value.current.y * -2 + 1

    const vertices = [normalizedX + 0.05, normalizedY - 0.05]

    for (let i = 0; i <= segmentsCount; i++) {
      const angle = i * angleStep
      const x = (Math.cos(angle) / radius) + normalizedX + 0.05
      const y = (Math.sin(angle) / radius * (window.innerWidth / window.innerHeight)) + normalizedY - 0.05
      vertices.push(x, y)
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, segmentsCount + 2)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  window.addEventListener('resize', () => debounce(resizeShaderCanvas(canvas.value, gl)))
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
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
