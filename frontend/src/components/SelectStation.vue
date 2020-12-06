<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <form>
          <div class="input-group input-group-lg">
            <input 
              type="text"
              id="inputSearch"
              class="form-control input-group-lg"
              placeholder="Search for your station/stop"
              v-model="searchString"
            />
            <span class="input-group-btn ml-3">
              <button 
                type="button"
                class="btn btn-primary btn-lg"
                @click="search()"
              >
                Search
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul id="searchResults" class="list-group mt-3">
          <li
            v-for="(station, index) in stations"
            class="list-group-item"
            :class="{ active: hoveredSearchResultIndex === index }"
            :key="index"
            role="button"
            @click="selectStation(station)"
            @mouseover="hoveredSearchResultIndex = index"
            @mouseleave="hoveredSearchResultIndex = -1"
          >
            {{ station.Name }} - {{ station.SiteId }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getStations } from '@/services/stations.api.js'

export default {
  name: 'SelectStation',
  data () {
    return {
      searchString: '',
      stations: [],
      hoveredSearchResultIndex: -1
    }
  },
  methods: {
    search () {
      this.$emit('input', null)
      this.getStationsByString(this.searchString)
    },
    selectStation (station) {
      this.$store.commit('setStation', station)
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
