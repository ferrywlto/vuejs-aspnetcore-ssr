import Vue from 'vue'
import Vuex from 'vuex'
import { fetchInitialMessages, fetchMessages } from './actions'
import minBy from 'lodash/minBy'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { messages: [], lastFetchedMessageDate: -1},

  mutations: {
    INITIAL_MESSAGES: (state, payload) => {
      state.messages = payload.messages
      state.lastFetchedMessageDate = payload.lastFetchedMessageDate
    },
    FETCH_MESSAGES: (state, payload) => {
      state.messages = state.messages.concat(payload.messages)
      state.lastFetchedMessageDate = minBy(state.messages, 'date').date
    }
  },
  actions: {
    fetchInitialMessages,
    fetchMessages
  },
  getters: {
    messages: state => state.messages,
    lastFetchedMessageDate: state => state.lastFetchedMessageDate
  }
})

export default store
