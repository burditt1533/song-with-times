<script setup lang="ts">
import songs from "../assets/songs.json";
import router from '@/router'
import { ref, onMounted } from 'vue'
import { songStore } from '@/stores/songs'

defineProps<{
  msg: string
}>()

const useSongStore = songStore()
const currentSong:any = ref({})
const songList:any = ref([])

const emit = defineEmits(['restartSong', 'changeSong'])

const selectSong = (song:any): void => {
  const isSameSong = song.mp3 === currentSong.value.mp3;
  const isSamePosition = song.position === currentSong.value.position;

  useSongStore.updateCurrentSong(song.parentSong)

  if (isSameSong && isSamePosition) {
    emit('restartSong', currentSong.value.position)
  } else if (isSameSong && !isSamePosition) {
    currentSong.value = song;
    emit('restartSong', song.position)
  } else {
    currentSong.value = song;
    emit('changeSong', currentSong.value)
  }
}

const secondsToTime = (seconds:any) :string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = Math.floor(
    seconds - hours * 3600 - minutes * 60
  );

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

const convertedTime = (song:any) => {
  const totalSeconds = song.start;
  // const { minutes, seconds } = secondsToTime(totalSeconds);
  const start = song.start.toFixed(2)
  const end = song.end.toFixed(2)
  return `${start} - ${end}`;
}

const convertMilitaryToAmPm = (song) => {
  const militaryTime = song.timeOfDay;
  const [hours, minutes] = militaryTime.split(":").map(Number);

  const period = hours < 12 || hours === 24 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12; // Handles 0 and 12

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

const editSong = (song, e) => {
  e.stopPropagation()
  useSongStore.updateSongToEdit(song.parentSong)
  router.push('/edit-song')
}

onMounted(() => {
})
</script>

<template>
  <div class="container">
    <table>
      <tr class="stick-header">
        <th>id</th>
        <th>Artist</th>
        <th>Song Title</th>
        <th>Time</th>
        <th>Position</th>
        <th>Edit</th>
      </tr>
      <tr
        v-for="(song, index) in useSongStore.allTimes" :key="index"
        :class="['song-row', { current: song === currentSong }]"
        @click="selectSong(song)"
      >
        <td class="field">{{ index + 1 }}</td>
        <td class="field">{{ song.artist }}</td>
        <td class="field">{{ song.title }}</td>
        <td class="field">{{ convertMilitaryToAmPm(song) }}</td>
        <td class="field">{{ convertedTime(song) }}</td>
        <td class="field" @click="(e) => {editSong(song, e)}">Edit</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.field {
  text-transform: capitalize;
}

.am {
  text-transform: uppercase;
}

.song-row {
  cursor: pointer;
}

.container {
  width: 100%;
  overflow: scroll;

  .stick-header {
    position: sticky;
    top: -1px;
    background: white;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    height: 30%;
  }

  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 30px 10px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  tr.current {
    background-color: #41b884;

    td {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
