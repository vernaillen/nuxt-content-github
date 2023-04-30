<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <ul>
      <li>
        first commit:
        <ul v-if="page.firstCommit">
          <li>{{ formatDate(page.firstCommit.author.date) }}</li>
          <li>
            author: {{ page.firstCommit.author.name }} - {{ page.firstCommit.author.email }}
          </li>
        </ul>
        <span v-else>
          not found
        </span>
      </li>
      <li>
        last commit:
        <ul v-if="page.lastCommit">
            <li>{{ formatDate(page.lastCommit.author.date) }}</li>
          <li>
            author: {{ page.lastCommit.author.name }} - {{ page.lastCommit.author.email }}
          </li>
        </ul>
        <span v-else>
          not found
        </span>
      </li>
      <li v-if="page.editLink">
        <a :href="page.editLink">edit content</a>
      </li>
  </ul>
</template>
