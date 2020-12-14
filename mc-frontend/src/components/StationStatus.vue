<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="my-3">{{ station.Name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          v-for="trafficType in trafficTypes"
          :key="trafficType"
          class="btn btn-sm btn-primary mr-2 mb-2"
          :class="{ active: selectedTrafficType === trafficType }"
          @click.prevent="selectedTrafficType = trafficType"
        >
          {{ trafficType }}
        </button>
      </div>
    </div>
    <div class="row">
        <div class="col">
          <p
            v-if="realtimeInformation.length === 0 && selectedTrafficType !== null"
          >
            No traffic of this type in near time at this location.
          </p>
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
export default {
  name: 'StationStatus',
  computed: {
    station () {
      return this.$store.state.settings.station
    },
    realtimeInformation () {
      if (this.selectedTrafficType === null) {
        return []
      }
      return this.$store.state.stationInformation.data[this.selectedTrafficType]
    },
    selectedTrafficType: {
      get: function () {
        return this.$store.state.settings.trafficType
      },
      set: function (newValue) {
        this.$store.commit('setTrafficType', newValue)
      }
    },
    latestUpdated () {
      return this.$store.state.stationInformation.updated
    }
  },
  data () {
    return {
      trafficTypes: [
        'Metros',
        'Buses',
        'Trains',
        'Trams'
      ]
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
