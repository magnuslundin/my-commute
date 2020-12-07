<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="my-3">{{ station.Name }}</h1>
      </div>
    </div>
    <div class="row">
      
        <div class="col">
          <transition name="fade">
            <ul
              v-if="realtimeInformation.length > 0"
              class="list-group"
            >
              <li
                v-for="(event, index) in realtimeInformation"
                class="list-group-item"
                :key="index"
              >
                <span class="badge badge-secondary mr-2">{{ event.DisplayTime }}</span> 
                {{ event.LineNumber }} &#187; {{ event.Destination }} <span class="text-faded"> {{ event.TimeTabledDateTime }}</span>
              </li>
            </ul>
          </transition>
        </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          <small>Updated {{ this.latestUpdated }}         
            <a
              href="#"
              @click.prevent="getRealTimeInformation()"
            >
              Reload
            </a>
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRealTimeInformationByStation } from '@/services/rt-information.api.js'

export default {
  name: 'StationStatus',
  created () {
    this.getRealTimeInformation()
  },
  data () {
    return {
      realtimeInformation: [],
      latestUpdated: ''
    }
  },
  computed: {
    station () {
      return this.$store.state.station
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
  .text-faded {
    color: #d3d3d3;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
