<template>
  <div id="app">
    <select-station />
    <station-status 
      v-if="selectedStation"
      :station="selectedStation"
    />
  </div>
</template>

<script>
import SelectStation from '@/components/SelectStation'
import StationStatus from '@/components/StationStatus'

export default {
  name: 'App',
  components: {
    SelectStation,
    StationStatus,
  },
  computed: {
    selectedStation () {
      return this.$store.state.station
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
