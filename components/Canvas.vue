<script setup lang="ts">
import * as THREE from 'three'

import vsSource from '~/assets/shader/mediaVertex.glsl'
import fsSource from '~/assets/shader/mediaFragment.glsl'

const nuxtApp = useNuxtApp()
const scroll = useScroll()

const canvas = ref()

const CAMERA_POS = 500

let observer: IntersectionObserver
let mediaStore: {
  media: HTMLImageElement
  material: THREE.ShaderMaterial
  mesh: THREE.Mesh
  width: number
  height: number
  top: number
  left: number
  isInView: boolean
}[] = []

let scene: THREE.Scene
let geometry: THREE.PlaneGeometry
let material: THREE.ShaderMaterial

const setPositions = () => {
  mediaStore.forEach((object) => {
    if (object.isInView) {
      object.mesh.position.x = object.left - window.innerWidth / 2 + object.width / 2
      object.mesh.position.y = -object.top + window.innerHeight / 2 - object.height / 2 + scroll.value.scrollY
    }
  })
}

const clearMediaStore = () => {
  mediaStore.forEach((object) => {
    observer.unobserve(object.media)

    object.mesh.geometry.dispose()
    object.material.dispose()

    scene.remove(object.mesh)
  })
}

const setMediaStore = (scrollY: number) => {
  const media = [...document.querySelectorAll('[data-webgl-media]')] as HTMLImageElement[]

  mediaStore = media.map((media, i) => {
    observer.observe(media)

    media.dataset.index = String(i)

    const bounds = media.getBoundingClientRect()
    const imageMaterial = material.clone()
    const imageMesh = new THREE.Mesh(geometry, imageMaterial)

    let texture: THREE.Texture | null = null

    texture = new THREE.Texture(media)
    texture.needsUpdate = true

    imageMaterial.uniforms.uTexture.value = texture
    imageMaterial.uniforms.uTextureSize.value.x = (media as HTMLImageElement).naturalWidth
    imageMaterial.uniforms.uTextureSize.value.y = (media as HTMLImageElement).naturalHeight
    imageMaterial.uniforms.uQuadSize.value.x = bounds.width
    imageMaterial.uniforms.uQuadSize.value.y = bounds.height
    imageMaterial.uniforms.uBorderRadius.value = getComputedStyle(media).borderRadius.replace('px', '')

    imageMesh.scale.set(bounds.width, bounds.height, 1)

    if (!(bounds.top >= 0 && bounds.top <= window.innerHeight)) {
      imageMesh.position.y = 2 * window.innerHeight
    }

    scene.add(imageMesh)

    return {
      media,
      material: imageMaterial,
      mesh: imageMesh,
      width: bounds.width,
      height: bounds.height,
      top: bounds.top + scrollY,
      left: bounds.left,
      isInView: bounds.top >= 0 && bounds.top <= window.innerHeight,
    }
  })
}

const calcFov = () => 2 * Math.atan((window.innerHeight / 2) / CAMERA_POS) * 180 / Math.PI

onMounted(() => {
  // register actions after page transition
  nuxtApp.hook('page:transition:finish', () => {
    window.scrollTo(0, 0)
    clearMediaStore()
    setTimeout(() => {
      setMediaStore(0)
    }, 100)
  })

  // create intersection observer to only render in view elements
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = (entry.target as HTMLElement).dataset.index

        if (index) {
          mediaStore[parseInt(index)].isInView = entry.isIntersecting
        }
      })
    },
    { rootMargin: '20px 0px 20px 0px' },
  )

  // scene
  scene = new THREE.Scene()

  // camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 10, 1000)
  camera.position.z = CAMERA_POS
  camera.fov = calcFov()
  camera.updateProjectionMatrix()

  // geometry and material
  geometry = new THREE.PlaneGeometry(1, 1, 100, 100)
  material = new THREE.ShaderMaterial({
    uniforms: {
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uTexture: { value: null },
      uTextureSize: { value: new THREE.Vector2(100, 100) },
      uQuadSize: { value: new THREE.Vector2(100, 100) },
      uBorderRadius: { value: 0 },
    },
    vertexShader: vsSource,
    fragmentShader: fsSource,
    glslVersion: THREE.GLSL3,
  })

  // media details
  setTimeout(() => {
    setMediaStore(scroll.value.scrollY)
  }, 100)

  // renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // render loop
  const render = (time = 0) => {
    time /= 1000

    mediaStore.forEach((object) => {
      if (object.isInView) {
        object.material.uniforms.uResolution.value.x = window.innerWidth
        object.material.uniforms.uResolution.value.y = window.innerHeight
        object.material.uniforms.uTime.value = time
      } else {
        object.mesh.position.y = 2 * window.innerHeight
      }
    })

    setPositions()

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  window.addEventListener('resize', debounce(() => {
    const fov = calcFov()

    resizeThreeCanvas({ camera, fov, renderer })

    mediaStore.forEach((object) => {
      const bounds = object.media.getBoundingClientRect()
      object.mesh.scale.set(bounds.width, bounds.height, 1)
      object.width = bounds.width
      object.height = bounds.height
      object.top = bounds.top + scroll.value.scrollY
      object.left = bounds.left
      object.isInView = bounds.top >= 0 && bounds.top <= window.innerHeight
      object.material.uniforms.uTextureSize.value.x = (object.media as HTMLImageElement).naturalWidth
      object.material.uniforms.uTextureSize.value.y = (object.media as HTMLImageElement).naturalHeight
      object.material.uniforms.uQuadSize.value.x = bounds.width
      object.material.uniforms.uQuadSize.value.y = bounds.height
      object.material.uniforms.uBorderRadius.value = getComputedStyle(object.media).borderRadius.replace('px', '')
    })
  }))
})
</script>

<template>
  <div class="wrap">
    <canvas ref="canvas" />

    <div class="card">
      <img
        src="/texture.jpg"
        data-webgl-media
      >
      <h3>card 1</h3>
      <p>this is a test card</p>
    </div>

    <div class="card">
      <img
        src="/texture.jpg"
        data-webgl-media
      >
      <h3>card 2</h3>
      <p>this is a test card</p>
    </div>

    <div class="card">
      <img
        src="/texture.jpg"
        data-webgl-media
      >
      <h3>card 3</h3>
      <p>this is a test card</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wrap {
  display: grid;
  justify-content: center;
}

.card {
  max-width: to-rem(400);
  margin: to-rem(100);
}
</style>
