import { PerspectiveCamera, OrthographicCamera, WebGLRenderer } from 'three'

export const resizeThreeCanvas = (camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer) => {
  if (camera instanceof PerspectiveCamera) {
    camera.aspect = window.innerWidth / window.innerHeight
  }

  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
