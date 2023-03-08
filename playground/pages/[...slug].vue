<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <main>
    <Nav />
    <ContentDoc />
    <hr>
    <div class="gitinfo">
      Git info:
      <div>created: {{ page.created }}</div>
      <div>updated: {{ page.updated }}</div>
    </div>
  </main>
</template>

<style scoped>
.gitinfo > div {
  margin-left: 10px;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
