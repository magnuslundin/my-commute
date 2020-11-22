<template>
  <div id="station-status">
    <h1>{{ station.Name }}</h1>
    <span>Updated {{ this.latestUpdated }} </span>
    <button 
      type="button"
      @click="getRealTimeInformation()"
    >
      Reload
    </button>
    <div class="station-status--event-container">
      <ul>
        <li
          v-for="(event, index) in realtimeInformation"
          :key="index"
        >
          <span class="label">{{ event.DisplayTime }}</span> {{ event.LineNumber }} &#187; {{ event.Destination }} : {{ event.TimeTabledDateTime }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRealTimeInformationByStation } from '@/services/rt-information.api.js'

export default {
  name: 'StationStatus',
  props: {
    station: {
      type: Object,
      required: true
    }
  },
  created () {
    this.getRealTimeInformation()
  },
  data () {
    return {
      realtimeInformation: [],
      latestUpdated: ''
    }
  },
  methods: {
    getRealTimeInformation () {
      getRealTimeInformationByStation(this.station.SiteId, 60)
        .then(response => {
          this.realtimeInformation = response.data.ResponseData.Buses
          this.latestUpdated = response.data.ResponseData.LatestUpdate
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .label {
    background-color: #00008B;
    color: #FAFAFA;
    padding: 2px;
    border-radius: 3px;
  }
</style>
