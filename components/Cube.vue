<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'

const canvas = ref()

onMounted(() => {
  const pane = new Pane()

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 3
  pane.addInput(camera.position, 'z', { min: 1, max: 10 })

  // const cameraHelper = new THREE.CameraHelper(camera)
  // scene.add(cameraHelper)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshNormalMaterial()

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const controls = new OrbitControls(camera, canvas.value)
  controls.enableDamping = true
  controls.enableZoom = false

  const render = (time = 0) => {
    time /= 1000

    mesh.rotation.x = 2 * Math.PI * time * 0.1
    mesh.rotation.y = 2 * Math.PI * time * 0.2

    renderer.render(scene, camera)

    controls.update()

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  window.addEventListener('resize', () => debounce(resizeThreeCanvas(camera, renderer)))
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
