import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      station: null
    },
    searchVisible: true
  },
  mutations: {
    setStation (state, station) {
        state.settings.station = station
    },
    setSearchVisible (state, visibility) {
      state.searchVisible = visibility
  }
  }
})
