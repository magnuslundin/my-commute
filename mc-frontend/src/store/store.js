import Vue from 'vue'
import Vuex from 'vuex'
import { getRealTimeInformationByStation } from '@/services/rt-information.api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      station: null,
      trafficType: null,
      destination: null
    },
    stationDepartures: {
      data: [],
      updated: null
    },
    searchVisible: true
  },
  actions: {
    selectStation ({ dispatch, commit }, station) {
      commit('setStation', station)
      dispatch('updateStationDepartures')
    },
    updateStationDepartures ({ commit, state}) {
      getRealTimeInformationByStation(state.settings.station.SiteId, 60)
      .then(response => {
        commit('setStationDepartures', {
          data: response.data.ResponseData,
          updated: response.data.ResponseData.LatestUpdate
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  mutations: {
    setStationDepartures (state, stationDepartures) {
      state.stationDepartures = stationDepartures
    },
    setStation (state, station) {
        state.settings.station = station
    },
    setTrafficType (state, trafficType) {
      state.settings.trafficType = trafficType
    },
    setDestination (state, destination) {
      state.settings.destination = destination
    },
    setSearchVisible (state, visibility) {
      state.searchVisible = visibility
  }
  }
})
