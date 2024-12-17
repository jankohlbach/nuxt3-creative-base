<script setup lang0="ts">
definePageMeta({
  pageTransition: globalTransition,
})
</script>

<template>
  <main>
    <NuxtLink to="/page-2">
      Page 2
    </NuxtLink>
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
