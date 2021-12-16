import { getList } from '@/api/department'

const state = {
  departmentDict: {},
  departmentOptions: []
}

const mutations = {
  SET_DEPARTMENT_DICT: (state, departmentDict) => {
    state.departmentDict = departmentDict
  },
  SET_DEPARTMENT_OPTIONS: (state, departmentOptions) => {
    state.departmentOptions = departmentOptions
  }
}

const actions = {
  initDepartment({ commit }) {
    return new Promise((resolve, reject) => {
      const departmentDict = {}
      const departmentOptions = []
      getList().then(res => {
        const { data } = res
        if (!data || data.length <= 0) {
          resolve('there are no departments init')
        } else {
          data.map(v => {
            departmentDict[v.id] = v.name
            departmentOptions.push({ 'id': v.id, 'name': v.name })
          })
          commit('SET_DEPARTMENT_DICT', departmentDict)
          commit('SET_DEPARTMENT_OPTIONS', departmentOptions)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
