import Vue from 'vue'
import Vuex from 'vuex'
import { getDeparturesByStation } from '@/services/departures.api.js'

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
      getDeparturesByStation(state.settings.station.id, 60)
      .then(response => {
        const now = new Date()
        const nowFormatted =  `${now.getFullYear()}-${(now.getMonth()+1)<10?'0':''}${now.getMonth()+1}-${now.getDate()<10?'0':''+now.getDate()}`+
                              ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        commit('setStationDepartures', {
          data: response.data.Departure,
          updated: nowFormatted
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
