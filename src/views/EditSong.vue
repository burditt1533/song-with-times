<script setup lang="ts">
  import Surfer from '../components/Surfer.vue'
  import { songStore } from '@/stores/songs'
  import { computed, onMounted } from 'vue'

  const useSongStore = songStore()

  const songToEdit = computed(() => useSongStore.songToEdit)

  onMounted(() => {
    console.log('edit song', songToEdit.value)
  })
</script>

<template>
  <div class="edit-container">
    <div v-if="!!songToEdit">
      <h2 class="artist">{{ songToEdit.artist }} - {{ songToEdit.title }}</h2>
      <Surfer :song="songToEdit" />
    </div>
    <h2 v-else class="artist">No Song Loaded</h2>
  </div>
</template>

<style>

</style>
