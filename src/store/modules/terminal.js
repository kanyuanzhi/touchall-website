const state = {
  terminalSelected: null
}

const mutations = {
  SET_TERMINAL_SELECTED: (state, terminalSelected) => {
    state.terminalSelected = terminalSelected
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
