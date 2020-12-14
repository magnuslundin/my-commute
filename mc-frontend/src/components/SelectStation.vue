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
              @input="search()"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <transition name="slide-fade">
          <ul
            v-if="stations.length > 0"
            id="searchResults" 
            class="list-group mt-3"
          >
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
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { getStations } from '@/services/stations.api.js'
import _ from 'lodash'

export default {
  name: 'SelectStation',
  data () {
    return {
      searchString: '',
      stations: [],
      hoveredSearchResultIndex: -1
    }
  },
  created () {
    this.search = _.throttle(this.search, 800)
  },
  methods: {
    search () {
      if (this.searchString.length > 0) {
        this.getStationsByString(this.searchString)
      } else {
        this.stations = []
      }
    },
    selectStation (station) {
      this.$store.dispatch('selectStation', station)
      this.$store.commit('setSearchVisible', false)
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
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
    z-index: -1;
  }
</style>