<template>
  <ContentNavigation v-slot="{ navigation }">
    <div class="nav">
      <span v-for="link of navigation" :key="link._path">
        <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
      </span>
    </div>
  </ContentNavigation>
  <hr>
</template>


<style scoped>
.nav {
  margin-top: 10px;
}
.nav>span {
  padding: 5px;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
