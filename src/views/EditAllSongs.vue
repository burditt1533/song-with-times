<script setup lang="ts">
  import Surfer from '../components/SurferForAll.vue'
  import { songStore } from '@/stores/songs'
  import { computed, onMounted, ref } from 'vue'

  const useSongStore = songStore()
  const songToEdit = computed(() => useSongStore.songToEdit)
  const itemRefs = ref([]);

  const someSongs = computed(() => {
    let amount = 0
    return useSongStore.songs.filter((time, index) => {
      console.log()
      const hasWorked = time.times.some((localTime) => localTime.end === 0 )
      if (hasWorked && amount < 5) {
        amount++
        return true
      }
    })
  })

  const CopyAll = () => {
    navigator.clipboard.writeText(JSON.stringify(useSongStore.songsUpdating))
  }

  const stopOthers = (mp3) => {
    itemRefs.value.forEach(player => {
      if(player.mp3 !== mp3) {
        player.stopPlayer()
      }
    })
  }

  onMounted(async () => {
    // console.log(someSongs.value)
    useSongStore.setSongsUpdating(someSongs.value)
  })
</script>

<template>
  <div class="edit-container">
    <button @click="CopyAll">Copy All</button>
    <div v-for="(song, index) in someSongs" :key="song.mp3">
      <h2 class="artist">{{ song.artist }} - {{ song.title }}</h2>
      <Surfer @playing="stopOthers" :song="song" :ref="el => itemRefs[index] = el" />
    </div>
    <!-- <h2 v-else class="artist">No Song Loaded</h2> -->
  </div>
</template>

<style>

</style>
