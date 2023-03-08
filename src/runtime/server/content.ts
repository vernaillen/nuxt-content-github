import simpleGit from 'simple-git'
import { GitHubData } from '../../types/github'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (file) => {
    console.log('afterParse for '+ file._id)
    const options = {
      createdDateName: 'created',
      updatedDateName: 'updated',
    }
    const git = simpleGit()
    const filePath = file._id.replaceAll(':', '/')
    try {
      /*const log = await git.log({
        file: filePath,
      })
      if (log.all.length > 0) {
        const oldest = log.all[log.all.length - 1]
        file[options.createdDateName]
          = oldest === null ? file.createdDate : new Date(oldest.date)
        file[options.updatedDateName]
          = log.latest === null ? file.updatedDate : new Date(log.latest.date)
      }*/

      const url = `https://api.github.com/repos/vernaillen/nuxt-content-github/commits?path=/playground/${filePath}`
      const gitHubData = await $fetch<GitHubData[]>(url, { query: { page: -1, per_page: 100 } })

      if (gitHubData) {
        console.log(gitHubData.length)
        if (gitHubData[0]) {
          //console.log(gitHubData[0])
          file[options.updatedDateName] = gitHubData[0].commit.author.date
        }
      }
    } catch (e) {
      console.error(e)
      file[options.createdDateName] = file.createdDate ? file.createdDate : new Date()
      file[options.updatedDateName] = file.updatedDate ? file.updatedDate : new Date()
    }
  })
})
