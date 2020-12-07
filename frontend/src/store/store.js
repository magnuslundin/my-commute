import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    station: null,
    searchVisible: true
  },
  mutations: {
    setStation (state, station) {
        state.station = station
    },
    setSearchVisible (state, visibility) {
      state.searchVisible = visibility
  }
  }
})
