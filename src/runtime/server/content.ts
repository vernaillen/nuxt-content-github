import { ref } from 'vue'
import { Commit, CommitsResponse } from '../../types/commit';
import gql from 'graphql-tag';
import { apiClient } from '../apiClient';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (file) => {
    console.log('afterParse for '+ file._id)
    const options = {
      createdDateName: 'created',
      updatedDateName: 'updated',
      gitHubOwner: 'vernaillen',
      gitHubRepo: 'nuxt-content-github',
      gitHubAppDir: 'playground',
      githubBranch: 'main',
      gitHubGQLHost: 'https://api.github.com/graphql',
      addEditLink: true
    }
    const filePath = file._id.replaceAll(':', '/')
    const lastCommit = ref<Commit>()
    const firstCommit = ref<Commit>()
    try {
      const commits = await fetchCommitsForFile(
        'vernaillen',
        'nuxt-content-github',
        'playground/content/index.md',
        100
      )
      console.log('after await: commits:')
      console.log(commits)

      lastCommit.value = commits[0]
      const nrOfCommits = commits.length
      firstCommit.value = commits[nrOfCommits - 1]
      if (firstCommit.value) {
        console.log('found first commit:')
        console.log(firstCommit.value)
        file['firstCommit'] = firstCommit.value
        file[options.createdDateName] = firstCommit.value.author?.date
        file['createdAuthor'] = firstCommit.value.author?.name
      }
      if (lastCommit.value) {
        console.log('found latest commit:')
        console.log(lastCommit.value)
        file['lastCommit'] = lastCommit.value
        console.log('lastCommit name: ' + lastCommit.value.author?.name)
        file[options.updatedDateName] = lastCommit.value.author?.date
        file['updatedAuthor'] = lastCommit.value.author?.name
      }
      if (options.addEditLink) {
        file['editLink'] = `https://github.com/${options.gitHubOwner}/${options.gitHubRepo}/edit/${options.githubBranch}/${options.gitHubAppDir}/${filePath}`
      }
      console.log('file:')
      console.log(file)
    } catch (e) {
      console.log(e)
      //file[options.createdDateName] = file.createdDate ? file.createdDate : new Date()
      //file[options.updatedDateName] = file.updatedDate ? file.updatedDate : new Date()
    }
  })
})

const GET_COMMITS_FOR_FILE = gql`
    query GetCommitsForFile($owner: String!, $repo: String!, $path: String!, $maxCount: Int!) {
      repository(owner: $owner, name: $repo) {
        ref(qualifiedName: "main") {
          target {
            ... on Commit {
              history(first: $maxCount, path: $path) {
                edges {
                  node {
                    oid
                    message
                    committedDate
                    author {
                      name
                      email
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

export async function fetchCommitsForFile (
  owner: string,
  repo: string,
  path: string,
  maxCount: number
): Promise<Commit[]> {
  const response = await apiClient.post('', {
    query: GET_COMMITS_FOR_FILE.loc.source.body,
    variables: { owner, repo, path, maxCount },
  });
  if (response.data.errors) {
    console.log('response errors:')
    console.log(response.data.errors)
  }
  if (response.data.data) {
    console.log('response data:')
    console.log(response.data.data)
  }
  const commitsResponse: CommitsResponse = response.data.data;
  return commitsResponse.repository.ref.target.history.edges.map((edge) => edge.node);
}
