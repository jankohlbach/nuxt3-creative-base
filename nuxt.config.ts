import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'nuxt3 creative base',
      link: [
        // { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      script: [
        { async: true, defer: true, 'data-website-id': 'dad39b61-b752-41ac-aeaf-87e504221384', src: 'https://tracking.jnkl.dev/umami.js', 'data-domains': 'nuxt3-creative-base.vercel.app' }
      ],
      meta: [
        { name: 'robots', content: 'noindex,nofollow' },
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'minimal nuxt3 starter for creative projects, includes scss setup, gsap, lenis scroll, a native webgl setting (the cursor) and a three.js setting (the cube)' },
        { name: 'og:title', content: 'nuxt3 creative base' },
        { name: 'og:description', content: 'minimal nuxt3 starter for creative projects, includes scss setup, gsap, lenis scroll, a native webgl setting (the cursor) and a three.js setting (the cube)' },
        // { name: 'og:image', content: '/og-image.jpg' },
        { name: 'og:type', content: 'website' },
        { name: 'og:locale', content: 'en' }
      ]
    }
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@/assets/styles/global.scss'
  ],
  vite: {
    plugins: [glsl()]
  }
})
