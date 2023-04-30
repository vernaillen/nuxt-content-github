import axios from 'axios';

const githubToken = useRuntimeConfig().githubToken

export const apiClient = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});
