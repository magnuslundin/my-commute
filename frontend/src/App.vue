<template>
  <div id="my-commute" class="container-fluid mt-5">
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-8 col-sm-12">
        <select-station />
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

export default {
  name: 'myCommute',
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
