<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted, defineExpose } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import { WaveSurferPlayer } from '@meersagor/wavesurfer-vue'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import CursorPlugin from 'wavesurfer.js/dist/plugins/hover.esm.js'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'
import { songStore } from '@/stores/songs'


type Time = {
  artist: string,
  title: string,
  position: number,
  start: number,
  end: number,
  duration?: number,
  mp3: string,
  youtube: string,
  timeOfDay: string,
}

type Song = {
  mp3: string,
  position: number,
  times: Time[]
}

const props = defineProps<{
  song: Song
}>()

const adjustment = ref(0)
const timeline = ref(null);
const surferRegions = ref(null)
const activeRegion = ref(null)
const theMedia = ref(null)
const isLoopRegion = ref(true)
const waveSurfer = ref<WaveSurfer | null>(null)
const useSongStore = songStore()
const currentManualZoom = ref(0)

const emit = defineEmits(['playing'])

watch(() => props.song, (newSong) => {
  surferRegions.value.clearRegions()
  waveSurfer.value.load(url.value)
});

watch(() => surferRegions.value, (newRegion) => {
  // console.log(newRegion)
}, { deep: true });

const url = computed(() => {
  // console.log(`${props.song.mp3}#t=${props.song.position - adjustment.value}`)
  // return `${props.song.mp3}#t=${props.song.position - adjustment.value}`
  const late = "scl/fi/iucy73y8i3wt59l27ox9a/Late-Night-feat.-Juicy-J.mp3?rlkey=r3uc5ue89le0zw1t46cg2rbed&dl=1"
  const rootUrl = false ? "https://www.dropbox.com/" : "https://dl.dropbox.com/"
  const ending = props.song?.mp3 || late
  const params = `#t=${props.song.position - adjustment.value}`

  return `${rootUrl}${ending}${params}`
})

const options = computed(() => {
  const timeLine = Timeline.create({
    container: timeline.value,
    height: 30,
    primaryColor: 'blue',
    secondaryColor: 'gray',
    primaryFontColor: 'blue',
    secondaryFontColor: 'gray',
  })

  const cursor = CursorPlugin.create({
    showTime: true,
    opacity: 1,
    customShowTimeStyle: {
      'background-color': '#000',
      color: '#fff',
      padding: '2px',
      'font-size': '10px'
    }
  })

  const regions = RegionsPlugin.create()

  return {
    url: url.value,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    autoCenter: false,
    autoScroll: false,
    mediaControls: true,
    dragToSeek: false,
    plugins: [
      timeLine,
      regions,
      cursor,
      // Minimap.create({
      //   height: 20,
      // }),
    ]
  }
})

const playFirstRegion = () => {
  const firstRegion = surferRegions.value.regions[0]
  waveSurfer.value.zoom(70)
  waveSurfer.value.setScrollTime(firstRegion.start - 5)

  activeRegion.value = firstRegion
  surferRegions.value.regions.forEach((localRegion) => {
    const color = localRegion.id === activeRegion.value.id ? 'rgba(0, 222, 37, 0.8)' : 'rgba(54, 118, 231, 0.5)'
    localRegion.setOptions({ color: color })
  })
}

const updateSongTimes = (region, e) => {
  let allRegions = surferRegions.value.regions.map((localRegion) => {
    return {
      "position": localRegion.start,
      "start": localRegion.start,
      "end": localRegion.end,
      "timeOfDay": localRegion.id
    }
  })

  let theSong = { ...props.song }
  theSong.times = allRegions
  useSongStore.updateSong(theSong.mp3, theSong)
}


const readyHandler = () => {
  surferRegions.value = waveSurfer.value.plugins[1]
  props.song.times.forEach(addRegion)
  surferRegions.value.enableDragSelection({ color: 'rgba(54, 118, 231, 0.5)' });

  playFirstRegion()

  surferRegions.value.on('region-update', updateSongTimes)
  surferRegions.value.on('region-removed', updateSongTimes)

  surferRegions.value.on('region-clicked', (region, e) => {
    e.stopPropagation()
    const isDeleteMarker = e.altKey && e.shiftKey
    const regionToDelete = surferRegions.value.regions.find((localRegion) => localRegion.id === region.id)
    activeRegion.value = region

    if (isDeleteMarker) {
      const deleteIndex = surferRegions.value.regions.indexOf(regionToDelete)
      surferRegions.value.regions.splice(deleteIndex, 1);
      regionToDelete.remove()
    } else {
      activeRegion.value = region
      surferRegions.value.regions.forEach((localRegion) => {
        const color = localRegion.id === activeRegion.value.id ? 'rgba(0, 222, 37, 0.8)' : 'rgba(54, 118, 231, 0.5)'
        localRegion.setOptions({ color: color })
      })
      
      region.play(true)
      if(currentManualZoom.value < 70) {
        waveSurfer.value.zoom(70)
      }
    }
  })

  surferRegions.value.on('region-in', (region) => {
    // activeRegion.value = region
  })

  surferRegions.value.on('region-out', (region) => {
    if (activeRegion.value?.id !== region?.id) return

    if (isLoopRegion.value) {
      region.play()
    } else {
      // activeRegion.value = null
      waveSurfer.value.playPause()
    }
  })
  
}

const handleLoad = () => {
  
}

const readyWaveSurferHandler = (ws:WaveSurfer) => {
  waveSurfer.value = ws
}

const handleDecode = () => {
  const slider = document.querySelector('input[type="range"]') as HTMLInputElement

  slider.addEventListener('input', (e:Event) => {
    const target = e.target as HTMLInputElement
    currentManualZoom.value = target.valueAsNumber
    waveSurfer.value.zoom(this.currentManualZoom)
  })
}

const addRegion = (time) => {
  const endTime = time.end === 0 ? time.start + 2 : time.end

  surferRegions.value.addRegion({
    start: time.start,
    end: endTime,
    color: 'rgba(54, 118, 231, 0.5)',
    drag: true,
    resize: true,
    id: time.timeOfDay
  })
}

const saveAllRegions = (time) => {
  let allRegions = surferRegions.value.regions.map((localRegion) => {
    return {
      "position": localRegion.start,
      "start": localRegion.start,
      "end": localRegion.end,
      "timeOfDay": localRegion.id
    }
  })

  let theSong = { ...props.song }
  theSong.times = allRegions
  useSongStore.addToUpdatedSongs(theSong)
}

const updateRegionId = (event) => {
  activeRegion.value.id = event.target.value
}

const handleScroll = (event) => {
  const isScrollHorizontal = Math.abs(event.deltaX) > 5
  if (!isScrollHorizontal) {
    currentManualZoom.value = waveSurfer.value.options.minPxPerSec += event.deltaY
    // zoomLevel = zoomLevel > 100 ? 100 : zoomLevel
    currentManualZoom.value = currentManualZoom.value < 0 ? 0 : currentManualZoom.value
    waveSurfer.value.zoom(currentManualZoom.value)
  }
}
const resetZoom = (event) => {
  currentManualZoom.value = 0
  waveSurfer.value.zoom(0)
}

const toggleLoopRegion = (event) => {
  isLoopRegion.value = !isLoopRegion.value
}

const stopPlayer = () => {
  waveSurfer.value.pause()
}

const handlePlay = (event) => {
  emit('playing', props.song.mp3)
}

defineExpose({ stopPlayer, mp3: props.song.mp3 })

onMounted(async () => {

})

onUnmounted(async () => {
  waveSurfer.value.destroy()
})


</script>

<template>
  <div>
    <div class="buttons-container">
      <button @click="waveSurfer?.playPause()" class="buttom-button">
        Play
      </button>
      <button @click="updateSongTimes" class="buttom-button">
        Update Song In Store
      </button>
      <button @click="resetZoom" class="buttom-button">
        Reset Zoom
      </button>
      <button @click="toggleLoopRegion" :class="['buttom-button', 'loop-button', {active: isLoopRegion}]">
        Loop Regions
      </button>
    </div>


    <div class="edit-region">
      <input
        id="start"
        type="text"
        :value="activeRegion?.start || ''"
        disabled
      >
      <input
        id="end"
        type="text"
        :value="activeRegion?.end || ''"
        disabled
      >
      <input
        id="tod"
        type="text"
        @input="updateRegionId"
        :value="activeRegion?.id || ''"
      >
    </div>

    <WaveSurferPlayer
      ref="wavesurfer"
      :options="options"
      @ready="readyHandler"
      @decode.once="handleDecode"
      @waveSurfer="(ws) => readyWaveSurferHandler(ws)"
      @wheel="handleScroll"
      @load="handleLoad"
      @play="handlePlay"
    />
    <label>
      Zoom: <input type="range" min="10" max="1000" value="10" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .edit-region {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .buttons-container {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    // .bottom-button {
      
    // }

    .loop-button{
      &.active {
        background: green;
        color: white
      }
    }
  }
</style>