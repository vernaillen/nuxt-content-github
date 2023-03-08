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
    <li>updated: {{ formatDate(page.updated) }}</li>
  </ul>

</template>
