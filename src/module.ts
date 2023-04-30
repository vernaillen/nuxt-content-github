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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // TODO: pass on the options from the module to the Nitro plugin?
    /*options = {
      createdAtName: 'created',
      updatedAtName: 'updated',
      ...options,
    }*/
    addServerPlugin(resolver.resolve('./runtime/server/content'))
  },
})
