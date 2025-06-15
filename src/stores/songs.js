import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import songList from "../assets/songs.json";

export const songStore = defineStore('songStore', {
  state: () => ({
    songs: [],
    allTimes: [],
    currentSong: null,
    songToEdit: null
  }),
  getters: {
    // currentSong () {
      

    //   return this.currentSong
    // }
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    populateSongs() {
      let list = [];
      this.songs = songList
      
      this.songs.forEach((song) => {
        if (!!song.times) {
          song.times.forEach((time) => {
            // if(time.end === 0) {
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
                parentSong: song
              });
            // }
          });
        } else {
          list.push(song);
        }
        songList.value = list.sort((a, b) => parseInt(a.timeOfDay) - parseInt(b.timeOfDay));

        this.allTimes = list
      });
    },
    updateCurrentSong(song) {
      this.currentSong = song
    },
    updateSongToEdit(song) {
      this.songToEdit = song
    }
  },
})