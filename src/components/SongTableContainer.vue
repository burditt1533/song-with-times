<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import SongTable from './SongTable.vue'
import { computed, ref, onMounted } from 'vue'


type Song = {
  artist: string,
  title: string,
  position: number,
  start: number,
  end: number,
  mp3: string,
  youtube: string,
  timeOfDay: string
}
const songs = ref([])
const currentSong = ref<Song>(null)
const adjustment = ref(0)

const playIt = () => {
  const audioElement: HTMLAudioElement = document.querySelector("#pagePlayer");
  audioElement.play();
  // setTimeout(() => {
  //   audioElement.pause();
  // }, song.duration * 1000);
}

const restartIt = (time) => {
  const audioElement: HTMLAudioElement = document.querySelector("#pagePlayer");
  audioElement.currentTime = time;
  audioElement.play();
}

const songChange = (song) => {
  currentSong.value = song;
}

const url = computed(() => {
  const rootUrl = false ? "https://www.dropbox.com/" : "https://dl.dropbox.com/"
  const ending = currentSong.value?.mp3
  const params = `#t=${currentSong.value.position - adjustment.value}`

  return `${rootUrl}${ending}${params}`
})

onMounted(() => {
})

</script>

<template>
  <div id="contain">
    <SongTable
      @changeSong="songChange"
      @restartSong="restartIt"
    />
    <div class="player-container">
      <audio
        v-if="!!currentSong"
        id="pagePlayer"
        class="page-player"
        controls
        :src="url"
        @canplay="playIt"
      ></audio>
    </div>
  </div>
</template>

<style scoped>
#contain {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  overflow: hidden;
}

.page-player {
  width: 100%;
}

.player-container {
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
