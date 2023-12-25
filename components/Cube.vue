<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'

const canvas = ref()

onMounted(() => {
  const pane = new Pane()

  // scene
  const scene = new THREE.Scene()

  // camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 3
  pane.addBinding(camera.position, 'z', { min: 1, max: 10 })

  // const cameraHelper = new THREE.CameraHelper(camera)
  // scene.add(cameraHelper)

  // geometry and material
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshNormalMaterial()

  // mesh
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // orbit controls
  const controls = new OrbitControls(camera, canvas.value)
  controls.enableDamping = true
  controls.enableZoom = false

  // render loop
  const render = (time = 0) => {
    time /= 1000

    mesh.rotation.x = 2 * Math.PI * time * 0.1
    mesh.rotation.y = 2 * Math.PI * time * 0.2

    renderer.render(scene, camera)

    controls.update()

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  window.addEventListener('resize', () => debounce(resizeThreeCanvas({ camera, renderer })))
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
