<template>
  <div id="my-commute" class="container-fluid">
      <div class="row justify-content-md-center">
        <transition name="slide-fade">
          <div
            v-if="searchVisible"
            class="col-lg-4 col-md-8 col-sm-12 bg-light"
          >
            <select-station 
              class="my-2"
            />        
          </div>
        </transition>
      </div>
      <div class="row justify-content-md-center">
        <div
          @click="searchVisible = !searchVisible"
          class="col-lg-4 col-md-8 col-sm-12 px-0 bg-light rounded-bottom search-handle-hover"
        >
          <div 
            class="text-center"
            role="button"
          >
              <b-icon-chevron-compact-up v-if="searchVisible" />
              <b-icon-chevron-compact-down v-if="!searchVisible" />
          </div>
        </div>
      </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-8 col-sm-12">
        <station-status 
          v-if="selectedStation"
          :station="selectedStation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectStation from '@/components/SelectStation'
import StationStatus from '@/components/StationStatus'
import { BIconChevronCompactUp, BIconChevronCompactDown } from 'bootstrap-vue'

export default {
  name: 'myCommute',
  components: {
    SelectStation,
    StationStatus,
    BIconChevronCompactUp,
    BIconChevronCompactDown
  },
  computed: {
    selectedStation () {
      return this.$store.state.settings.station
    },
    searchVisible: {
      get: function ()  {
        return this.$store.state.searchVisible
      },
      set: function (value) {
        this.$store.commit('setSearchVisible', value)
      }
    }
  },
  data() {
    return {
      alwaysShowSearch: false
    }
  }
}
</script>

<style scoped>
  .search-handle-hover {
    line-height: 1;
  }
  .search-handle-hover:hover {
    background: #eeeff0 !important;
  }
</style>
