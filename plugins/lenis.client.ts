import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
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

  return {
    provide: {
      lenis
    }
  }
})
