export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/content',
  ],
  runtimeConfig: {
    // can be overriden in .env by using NUXT_GITHUB_TOKEN
    githubToken: 'replace',
  },
  content: {
    documentDriven: true,
  },
  nuxtContentGitHub: {

  }
})
