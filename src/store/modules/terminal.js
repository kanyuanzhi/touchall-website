const state = {
  terminalSelected: null,
  terminalGroupSelected: null
}

const mutations = {
  SET_TERMINAL_SELECTED: (state, terminalSelected) => {
    state.terminalSelected = terminalSelected
  },
  SET_TERMINAL_GROUP_SELECTED: (state, terminalGroupSelected) => {
    state.terminalGroupSelected = terminalGroupSelected
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
