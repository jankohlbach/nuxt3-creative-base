import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const scroll = useScroll()

  const lenis = new Lenis()

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const scrollStop = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.paddingRight = `${scrollBarWidth}px`
    document.body.style.overflowY = 'hidden'
    lenis.stop()
  }

  const scrollStart = () => {
    document.body.style.paddingRight = ''
    document.body.style.overflowY = ''
    lenis.start()
  }

  scroll.value.scrollY = window.scrollY

  lenis.on('scroll', (_e) => {
    scroll.value.scrollY = window.scrollY
  })

  return {
    provide: {
      lenis,
      scrollStop,
      scrollStart,
    },
  }
})
