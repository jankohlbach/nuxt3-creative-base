import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()

const raf = (time: number) => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener('scroll:stop', () => {
  document.body.style.overflowY = 'hidden'
  lenis.stop()
})

window.addEventListener('scroll:start', () => {
  document.body.style.overflowY = ''
  lenis.start()
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('lenis', lenis)
})
