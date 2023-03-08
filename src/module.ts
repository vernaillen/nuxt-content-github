import {
  addServerPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'

// Module options TypeScript inteface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  // Default configuration options of the Nuxt module
  defaults: {},

  meta: {
    configKey: 'nuxtContentGitHub',
    name: 'nuxt-content-github',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    options = {
      createdAtName: 'created',
      updatedAtName: 'updated',
      ...options,
    }
    // TODO: How to pass on the options from the module to the Nitro plugin?
    addServerPlugin(resolver.resolve('./runtime/server/content'))
  },
})
