<script setup lang="ts">
import songs from "../assets/songs.json";
import { ref, onMounted } from 'vue'

defineProps<{
  msg: string
}>()

const currentSong:any = ref({})
const songList:any = ref([])

const emit = defineEmits(['restartSong', 'changeSong'])

const play = (song:any): void => {
  const isSameSong = song.mp3 === currentSong.value.mp3;
  const isSamePosition = song.position === currentSong.value.position;

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

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

const convertedTime = (song:any) => {
  const totalSeconds = song.position;
  const { minutes, seconds } = secondsToTime(totalSeconds);
  return secondsToTime(totalSeconds);
}

const convertMilitaryToAmPm = (song) => {
  const militaryTime = song.timeOfDay;
  const [hours, minutes] = militaryTime.split(":").map(Number);

  const period = hours < 12 || hours === 24 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12; // Handles 0 and 12

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

onMounted(() => {
  let list = [];
    songs.forEach((song) => {
      if (!!song.times) {
        song.times.forEach((time) => {
          list.push({
            artist: song.artist,
            title: song.title,
            position: time.position,
            start: time.start,
            end: time.end,
            duration: time.duration,
            mp3: song.mp3,
            youtube: song.youtube,
            timeOfDay: time.timeOfDay,
          });
        });
      } else {
        list.push(song);
      }
    });

    // this.songs = list;
    songList.value = list.sort((a, b) => parseInt(a.timeOfDay) - parseInt(b.timeOfDay));
    // let militaries = this.songs.map(this.convertTo24Hrs);
    // console.log(militaries);
    // militaries.forEach((song) => {
    //   console.log(song);
    // });
    // console.log(militaries.sort((a, b) => a.military - b.military));
})
</script>

<template>
  <div class="container">
    <table>
      <tr>
        <th>id</th>
        <th>Artist</th>
        <th>Song Title</th>
        <th>Time</th>
        <th>Position</th>
      </tr>
      <tr
        v-for="(song, index) in songList" :key="index"
        :class="['song-row', { current: song === currentSong }]"
        @click="play(song)"
      >
        <td class="field">{{ index + 1 }}</td>
        <td class="field">{{ song.artist }}</td>
        <td class="field">{{ song.title }}</td>
        <td class="field">{{ convertMilitaryToAmPm(song) }}</td>
        <td class="field">{{ convertedTime(song) }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>

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
