<script setup lang="ts">
definePageMeta({
  pageTransition: globalTransition,
})
</script>

<template>
  <main>
    <NuxtLink to="/page-2">Page 2</NuxtLink>
    <section class="container">
      <h1 data-inview>
        Nuxt yay
      </h1>
      <div class="grid media">
        <div
          class="image"
          data-canvas
        >
          <img
            src="/texture.jpg"
            alt="test-texture"
            crossorigin=""
          >
        </div>
        <div
          class="video"
          data-canvas
        >
          <video
            src="/video.mp4"
            muted
            autoplay
            loop
            playsinline
            crossorigin=""
          />
        </div>
      </div>
    </section>
    <section class="container">
      <h1 data-inview>
        Nuxt yay
      </h1>
      <div class="grid media">
        <div
          class="image"
          data-canvas
        >
          <img
            src="/texture.jpg"
            alt="test-texture"
            crossorigin=""
          >
        </div>
      </div>
    </section>
    <section class="container">
      <h1 data-inview>
        Nuxt yay
      </h1>
      <div class="grid media">
        <div
          class="image"
          data-canvas
        >
          <img
            src="/texture.jpg"
            alt="test-texture"
            crossorigin=""
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
section {
  margin-block: to-rem(100);
  display: flex;
  flex-direction: column;
  gap: to-rem(50);
  align-items: flex-start;
}

.media {
  align-items: start;
}

.image {
  grid-column: span 4;
}

.video {
  grid-column: 7 / span 6;
}
</style>
