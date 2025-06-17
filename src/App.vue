<script setup lang="ts">
import { RouterView } from 'vue-router'
import { songStore } from '@/stores/songs'
import { ref, onMounted } from 'vue'

const useSongStore = songStore()

onMounted(() => {
  useSongStore.populateSongs()
})
</script>

<template>
    <nav class="top-nav">
      <a href="/"><img alt="Vue logo" class="logo" src="./assets/logo.svg" /></a>
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/edit-song">Edit</router-link>
      <router-link class="nav-link" to="/edit_all_songs">Edit All</router-link>
    </nav>
  <RouterView />
</template>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
}


.top-nav {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 0px 8px 0 black;
  z-index: 1;
  gap: 10px;
  border-bottom: 1px solid #dddddd;

}

.logo {
  width: 30px;
}
</style>
