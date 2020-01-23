import api from 'axios'
import { getCompany } from 'steroids'

// Get user data from localStorage (cache).
const rawUser = localStorage.getItem('user')

// Initializing state with cached user data.
const stateData = {
  user: rawUser ? JSON.parse(rawUser) : {}
}

const getters = {
  theme: state => {
    return getCompany(state.user)
  },

  group: state => state.user.group,
  isAuth: state => !!state.user.token,
  token: state => state.user.token,
  user: state => state.user
}

const mutations = {
  replaceUser (state, user = {}) {
    user = { token: user.token, ...user.payload }

    if (user.token) {
      api.defaults.headers = { Authorization: `JWT ${user.token}` }
    }

    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const actions = {
  async authenticate ({ commit }, { code, sessionState, state }) {
    try {
      const { data } = await api.get('/authenticate', {
        params: { code, session_state: sessionState, state }
      })

      commit('replaceUser', data)
      return data.url
    } catch (error) {
      commit('replaceUser')
      throw error
    }
  },

  async getUser ({ commit }) {
    try {
      const { data } = await api.get('/get-user/')

      commit('replaceUser', data)
      return data
    } catch (error) {
      commit('replaceUser')
      throw error
    }
  },

  async signIn (context, { url }) {
    const { data } = await api.get('/signin/', {
      params: { url }
    })

    return data.signInUrl
  },

  async signOut ({ commit }) {
    const { data } = await api.get('/signout/')

    api.defaults.headers = {}
    commit('replaceUser')

    return data.signOutUrl
  }
}

export default {
  namespaced: true,

  state: stateData,
  getters,
  mutations,
  actions
}
