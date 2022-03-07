const state = {
  videoSelected: null
}

const mutations = {
  SET_VIDEO_SELECTED: (state, videoSelected) => {
    state.videoSelected = videoSelected
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
