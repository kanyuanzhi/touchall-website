import { login, register, logout, getInfo, updatePassword, updateAccount } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  id: '',
  token: getToken(),
  username: '',
  name: '',
  departments: [],
  contact: '',
  introduction: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPARTMENTS: (state, departments) => {
    state.departments = departments
  },
  SET_CONTACT: (state, contact) => {
    state.contact = contact
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { username, password, checkPassword } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, check_password: checkPassword }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user update account
  updateAccount({ commit }, userInfo) {
    const { id, name, departments, contact, introduction, avatar } = userInfo
    return new Promise((resolve, reject) => {
      updateAccount({
        id: id,
        name: name,
        departments: departments,
        contact: contact,
        introduction: introduction,
        avatar: avatar
      }).then(response => {
        commit('SET_NAME', name)
        commit('SET_DEPARTMENTS', departments)
        commit('SET_CONTACT', contact)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_AVATAR', avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user update password
  updatePassword({ commit }, passwordInfo) {
    const { oldPassword, newPassword, checkNewPassword } = passwordInfo
    return new Promise((resolve, reject) => {
      updatePassword({
        token: state.token,
        old_password: oldPassword,
        new_password: newPassword,
        check_new_password: checkNewPassword
      }).then(response => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { id, name, departments, contact, introduction, avatar, roles, username } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_USERNAME', username)
        commit('SET_ID', id)
        commit('SET_NAME', name)
        commit('SET_DEPARTMENTS', departments)
        commit('SET_CONTACT', contact)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
