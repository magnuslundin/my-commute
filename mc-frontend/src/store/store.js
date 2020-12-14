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
    stationInformation: {
      data: [],
      updated: null
    },
    searchVisible: true
  },
  actions: {
    selectStation ({ commit }, station) {
      commit('setStation', station)
      getRealTimeInformationByStation(station.SiteId, 60)
      .then(response => {
        commit('setStationInformation', {
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
    setStationInformation (state, stationInformation) {
      state.stationInformation = stationInformation
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
