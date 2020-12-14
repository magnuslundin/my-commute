<template>
  <div id="my-commute" class="container-fluid mt-5">
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-8 col-sm-12">
        <select-station 
          v-if="searchVisible"
        />
        <station-status 
          v-if="selectedStation"
          :station="selectedStation"
        />
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-8 col-sm-12">
        <button 
          role="button"
          class="btn btn-secondary btn-sm"
          v-if="!searchVisible"
          @click="searchVisible = true"
        >
          Select a new stop/station
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectStation from '@/components/SelectStation'
import StationStatus from '@/components/StationStatus'

export default {
  name: 'myCommute',
  components: {
    SelectStation,
    StationStatus,
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
