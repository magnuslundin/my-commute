<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="my-3">{{ station.Name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="btn-group">
          <button
            v-for="trafficType in trafficTypes"
            :key="trafficType"
            class="btn btn-sm btn-secondary mb-2"
            :class="{ active: selectedTrafficType === trafficType }"
            @click.prevent="selectTrafficType(trafficType)"
          >
            {{ trafficType }}
          </button>
        </div>
        <b-dropdown 
          id="destination-dropdown" 
          :text="selectedDestination ? selectedDestination.Destination : 'Filter destination'" 
          size="sm"
          class="ml-2 align-top"
          :disabled="destinations.length === 0"
        >
          <b-dropdown-item
            v-for="(destination, index) in destinations"
            :key="index"
            :active="isSelectedDestination(destination)"
            @click.prevent="selectedDestination = destination"
          >
            {{ destination.LineNumber + ' - ' + destination.Destination }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="row">
        <div class="col">
          <p
            v-if="currentStationDepartures.length === 0 && selectedTrafficType !== null"
          >
            No traffic of this type in near time at this location.
          </p>
          <transition name="fade">
            <ul
              v-if="currentStationDepartures.length > 0"
              class="list-group"
            >
              <li
                v-for="(event, index) in currentStationDeparturesFiltered"
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
    allStationDepartures () {
      return this.$store.state.stationDepartures.data
    },
    currentStationDepartures () {
      if (this.selectedTrafficType === null) {
        return []
      }
      return this.allStationDepartures[this.selectedTrafficType]
    },
    currentStationDeparturesFiltered () {
      if (this.selectedDestination === null) {
        return this.currentStationDepartures
      }
      return this.currentStationDepartures
      .filter(item => 
        item.LineNumber === this.selectedDestination.LineNumber &&
        item.Destination === this.selectedDestination.Destination
      )
    },
    selectedTrafficType: {
      get: function () {
        return this.$store.state.settings.trafficType
      },
      set: function (newValue) {
        this.$store.commit('setTrafficType', newValue)
      }
    },
    destinations() {
      const unique = {}
      this.currentStationDepartures.forEach (item => {
        unique[item.LineNumber + item.Destination] = {
          'LineNumber': item.LineNumber,
          'Destination': item.Destination
        }
      })
      return [...Object.values(unique)]
    },
    selectedDestination: {
      get: function () {
        return this.$store.state.settings.destination
      },
      set: function (newValue) {
        this.$store.commit('setDestination', newValue)
      }      
    },
    latestUpdated () {
      return this.$store.state.stationDepartures.updated
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
  },
  methods: {
    selectTrafficType (trafficType) {
      this.selectedTrafficType = trafficType
      this.selectedDestination = null
    },
    isSelectedDestination (destination) {
      if (!destination) return false
      return this.selectedDestination ?
            this.selectedDestination.LineNumber === destination.LineNumber && 
            this.selectedDestination.Destination === destination.Destination
            : false

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
