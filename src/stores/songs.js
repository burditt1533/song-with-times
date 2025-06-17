import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import songList from "../assets/songs.json";

export const songStore = defineStore('songStore', {
  state: () => ({
    songs: [],
    allTimes: [],
    songsUpdating: [],
    currentSong: null,
    songToEdit: null,
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
    },
    updateSong(url, newSong) {
      let songToUpdate = this.songsUpdating.find((song) => song.mp3 === url)
      if(!!songToUpdate) {
        const index = this.songsUpdating.indexOf(songToUpdate)
        this.songsUpdating.splice(index, 1, newSong);
        // console.log(this.songsUpdating)
      }
    },
    setSongsUpdating (songs) {
      // console.log(songs)
      this.songsUpdating = songs
    }
  },
})