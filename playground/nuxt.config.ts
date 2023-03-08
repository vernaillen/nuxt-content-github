export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/content',
  ],
  content: {
    documentDriven: true,
  },
  nuxtContentGitHub: {

  }
})
