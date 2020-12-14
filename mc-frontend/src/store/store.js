import Vue from 'vue'
import Vuex from 'vuex'
import { getRealTimeInformationByStation } from '@/services/rt-information.api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      station: null
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
          data: response.data.ResponseData.Buses,
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
    setSearchVisible (state, visibility) {
      state.searchVisible = visibility
  }
  }
})
