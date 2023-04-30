<script setup lang="ts">
import dayjs from 'dayjs'

const formatDate = (d: string) => {
  const date = dayjs(d)
  return date.format('D MMMM YYYY HH:mm')
}
const { page } = useContent()
</script>

<template>
  <ul>
    <li>created: {{ formatDate(page.created) }}</li>
    <li>updated: {{ formatDate(page.updated) }} by {{ page.updatedAuthor }}</li>
    <li v-if="page.updatedUrl">
      last commit: <a :href="page.updatedUrl">commit</a>
    </li>
    <li v-if="page.editLink">
      <a :href="page.editLink">edit content</a>
    </li>
    <li>
      last commit data:
      <ul v-if="page.lastCommit">
        <li>raw: {{ page.lastCommit }}</li>
        <li>
          {{ page.lastCommit.author.name }}<br>
          {{ page.lastCommit.author.email }}
        </li>
        <li>{{ formatDate(page.lastCommit.author.date) }}</li>
      </ul>
      <span v-else>
        not found
      </span>
    </li>
    <li>
      first commit data:
      <ul v-if="page.firstCommit">
        <li>raw: {{ page.firstCommit }}</li>
        <li>
          {{ page.firstCommit.author.name }}<br>
          {{ page.firstCommit.author.email }}
        </li>
        <li>{{ formatDate(page.firstCommit.author.date) }}</li>
      </ul>
      <span v-else>
        not found
      </span>
    </li>
  </ul>
</template>
