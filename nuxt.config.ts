import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://nuxt3-creative-base.vercel.app'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'nuxt3 creative base',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      script: [
        { async: true, src: 'https://tracking.jnkl.dev/script.js', 'data-do-not-track': 'true', 'data-website-id': '1862b35f-c5b6-4845-a072-95c964c7a5e5', 'data-domains': 'nuxt3-creative-base.vercel.app' }
      ],
      meta: [
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'minimal nuxt3 starter for creative projects, includes scss setup, gsap, lenis scroll, a native webgl setting (the cursor) and a three.js setting (the cube)' },
        { property: 'og:title', content: 'nuxt3 creative base' },
        { property: 'og:description', content: 'minimal nuxt3 starter for creative projects, includes scss setup, gsap, lenis scroll, a native webgl setting (the cursor) and a three.js setting (the cube)' },
        // { property: 'og:image', content: 'https://nuxt3-creative-base.vercel.app/og-image.jpg' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en' }
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/functions" as *; @use "~/assets/styles/mixins" as *;'
        }
      }
    },
    plugins: [glsl()]
  },
  modules: ['nuxt-simple-robots']
})
