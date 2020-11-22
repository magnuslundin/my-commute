<template>
    <div class="selection-station">
      <div id="selection-station--input">
        <input 
          type="text"
          v-model="searchString"
        />
        <button 
          type="button"
          @click="search()"
        >
          Search
        </button>
      </div>
      <div id="select-station--result">
        <ul>
          <li
            v-for="(station, index) in stations"
            class="select-station--result-item"
            :key="index"
            @click="selectStation(station)"
          >
            {{ station.Name }} - {{ station.SiteId }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { getStations } from '@/services/stations.api.js'

export default {
  name: 'SelectStation',
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      searchString: '',
      stations: []
    }
  },
  methods: {
    search () {
      this.$emit('input', null)
      this.getStationsByString(this.searchString)
    },
    selectStation (station) {
      this.$emit('input', station)
      this.stations = []
      this.searchString = ''
    },
    getStationsByString (string) {
      getStations(string)
        .then(response => {
          this.stations = response.data.ResponseData
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  li.select-station--result-item {
    cursor: pointer;
  }
    li.select-station--result-item:hover {
      background-color: #c0c0c0;
    }
</style>
