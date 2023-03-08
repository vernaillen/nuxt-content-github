import simpleGit from 'simple-git'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (file) => {
    const options = {
      createdDateName: 'created',
      updatedDateName: 'updated',
    }
    const git = simpleGit()
    const filePath = file._id.replaceAll(':', '/')
    try {
      const log = await git.log({
        file: filePath,
      })
      if (log.all.length > 0) {
        const oldest = log.all[log.all.length - 1]
        file[options.createdDateName]
          = oldest === null ? file.createdDate : new Date(oldest.date)
        file[options.updatedDateName]
          = log.latest === null ? file.updatedDate : new Date(log.latest.date)
      }
    } catch (e) {
      file[options.createdDateName] = file.createdDate ? file.createdDate : new Date()
      file[options.updatedDateName] = file.updatedDate ? file.updatedDate : new Date()
    }
  })
})
