<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

onMounted(() => {
  const lenis = new Lenis()

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>

<template>
  <main>
    <Cursor />
    <Cube />
    <section>
      <h1>section 1</h1>
    </section>
    <section>
      <h1>section 2</h1>
    </section>
    <section>
      <h1>section 3</h1>
    </section>
  </main>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
}
</style>
