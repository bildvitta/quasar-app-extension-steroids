import Vue from 'vue'
import api from 'axios'

export default function (resource, options = {}) {
  if (!resource) {
    throw new Error('Resource name must be specified.')
  }

  function call (name, ...parameters) {
    if (typeof options[name] === 'function') {
      options[name](parameters)
    }
  }

  const idAttribute = options.idAttribute || 'uuid'
  const perPage = options.perPage || 12

  const methods = options.methods || [
    'FETCH_LIST',
    'FETCH_SINGLE',
    'FETCH_FIELDS',
    'CREATE',
    'UPDATE',
    'REPLACE',
    'DESTROY'
  ]

  const hasFetchList = methods.includes('FETCH_LIST')
  const hasFetchSingle = methods.includes('FETCH_SINGLE')
  const hasFetchFields = methods.includes('FETCH_FIELDS')
  const hasCreate = methods.includes('CREATE')
  const hasUpdate = methods.includes('UPDATE')
  const hasReplace = methods.includes('REPLACE')
  const hasDestroy = methods.includes('DESTROY')

  // States
  const stateData = {
    fields: [],
    list: [],
    totalPages: 0
  }

  if (hasFetchList) {
    stateData.isFetchingList = false
    stateData.fetchListError = null
  }

  if (hasFetchSingle) {
    stateData.isFetchingSingle = false
    stateData.fetchSingleError = null
  }

  if (hasFetchFields) {
    stateData.isFetchingFields = false
    stateData.fetchFieldsError = null
  }

  if (hasCreate) {
    stateData.isFetchingSingle = false
    stateData.fetchSingleError = null
  }

  if (hasUpdate) {
    stateData.isUpdating = false
    stateData.updateError = null
  }

  if (hasReplace) {
    stateData.isReplacing = false
    stateData.replaceError = null
  }

  if (hasDestroy) {
    stateData.isDestroying = false
    stateData.destroyError = null
  }

  Object.assign(stateData, options.state || {})

  // Getters
  const getters = {
    list: state => state.list,

    fields: state => state.fields,

    totalPages: state => state.totalPages,

    byId: state => id => state.list.find(item => item[idAttribute] === id),

    isLoading: state => (
      state.isFetchingList ||
      state.isFetchingSingle ||
      state.isFetchingFields ||
      state.isCreating ||
      state.isUpdating ||
      state.isReplacing ||
      state.isDestroying
    ),

    hasErrors: state => (
      state.fetchListError !== null ||
      state.fetchSingleError !== null ||
      state.fetchFieldsError !== null ||
      state.createError !== null ||
      state.updateError !== null ||
      state.replaceError !== null ||
      state.destroyError !== null
    )
  }

  Object.assign(getters, options.getters || {})

  // Mutations
  const mutations = {}

  if (hasFetchList) {
    mutations.fetchListStart = state => {
      state.isFetchingList = true
      call('onFetchListStart', state)
    }

    mutations.fetchListSuccess = (state, response, increment) => {
      const { results, count } = response.data

      increment
        ? state.list.push(...results)
        : state.list = results || []

      state.totalPages = Math.ceil(count / perPage)
      state.fetchListError = null
      state.isFetchingList = false
      call('onfetchListSuccess', state, response)
    }

    mutations.fetchListError = (state, error, increment) => {
      if (!increment) {
        state.list = []
      }

      state.fetchListError = error
      state.isFetchingList = false
      call('onFetchListError', state, error)
    }
  }

  if (hasFetchSingle) {
    mutations.fetchSingleStart = state => {
      state.isFetchingSingle = true
      call('onFetchSingleStart', state)
    }

    mutations.fetchSingleSuccess = (state, response) => {
      const { data } = response

      const index = state.list.findIndex(
        item => item[idAttribute] === data[idAttribute]
      )

      ~index
        ? Vue.set(state.list, index, data)
        : state.list.push(data)

      state.fetchSingleError = null
      state.isFetchingSingle = false
      call('onFetchSingleSuccess', state, response)
    }

    mutations.fetchSingleError = (state, error) => {
      state.fetchSingleError = error
      state.isFetchingSingle = false
      call('onFetchSingleError', state, error)
    }
  }

  if (hasFetchFields) {
    mutations.fetchFieldsStart = state => {
      state.isFetchingFields = true
      call('onFetchFieldsStart', state)
    }

    mutations.fetchFieldsSuccess = (state, response) => {
      const results = response.data.actions.pOST

      for (const key in results) {
        state.fields.push(results[key])
      }

      state.fetchFieldsError = null
      state.isFetchingFields = false
      call('onfetchFieldsSuccess', state, response)
    }

    mutations.fetchFieldsError = (state, error) => {
      state.fetchFieldsError = error
      state.isFetchingFields = false
      call('onFetchFieldsError', state, error)
    }
  }

  if (hasCreate) {
    mutations.createStart = state => {
      state.isCreating = true
      call('onCreateStart', state)
    }

    mutations.createSuccess = (state, response) => {
      const { data } = response

      if (data) {
        state.list.push(data)
      }

      state.createError = null
      state.isCreating = false
      call('onCreateSuccess', state, response)
    }

    mutations.createError = (state, error) => {
      state.createError = error
      state.isCreating = false
      call('onCreateError', state, error)
    }
  }

  if (hasUpdate) {
    mutations.updateStart = state => {
      state.isUpdating = true
      call('onUpdateStart', state)
    }

    mutations.updateSuccess = (state, response) => {
      const { data } = response

      for (const index in state.list) {
        const item = state.list[index]

        if (item[idAttribute] === data[idAttribute]) {
          Vue.set(state.list, index, { ...item, ...data })
          break
        }
      }

      state.updateError = null
      state.isUpdating = false
      call('onUpdateSuccess', state, response)
    }

    mutations.updateError = (state, error) => {
      state.updateError = error
      state.isUpdating = false
      call('onUpdateError', state, error)
    }
  }

  if (hasReplace) {
    mutations.replaceStart = state => {
      state.isReplacing = true
      call('onReplaceStart', state)
    }

    mutations.replaceSuccess = (state, response) => {
      const { data } = response

      const index = state.list.findIndex(
        item => item[idAttribute] === data[idAttribute]
      )

      if (~index) {
        Vue.set(state.list, index, data)
      }

      state.replaceError = null
      state.isReplacing = false
      call('onReplaceSuccess', state, response)
    }

    mutations.replaceError = (state, error) => {
      state.replaceError = error
      state.isReplacing = false
      call('onReplaceError', state, error)
    }
  }

  if (hasDestroy) {
    mutations.destroyStart = state => {
      state.isDestroying = true
      call('onDestroyStart', state)
    }

    mutations.destroySuccess = (state, id) => {
      const index = state.list.findIndex(item => item[idAttribute] === id)

      if (~index) {
        Vue.delete(state.list, index)
      }

      state.destroyError = null
      state.isDestroying = false
      call('onDestroySuccess', state, id)
    }

    mutations.destroyError = (state, error) => {
      state.destroyError = error
      state.isDestroying = false
      call('onDestroyError', state, error)
    }
  }

  // Actions
  const actions = {}

  if (hasFetchList) {
    actions.fetchList = (
      { commit },
      { filters = {}, increment, ordering = [], page = 1, limit, search, url } = {}
    ) => {
      const params = {
        ...filters,
        limit,
        offset: (page - 1) * (limit || perPage),
        ordering: ordering.length ? ordering.join(',') : null,
        search
      }

      commit('fetchListStart')
      url = url || options.replaceURL || `/${resource}/`

      return api.get(url, { params }).then(response => {
        commit('fetchListSuccess', response, increment)
        return response
      }).catch(error => {
        commit('fetchListError', error, increment)
        return Promise.reject(error)
      })
    }
  }

  if (hasFetchSingle) {
    actions.fetchSingle = ({ commit }, { id, params, url } = {}) => {
      commit('fetchSingleStart')
      url = url || options.fetchSingleURL || `/${resource}/${id}/`

      return api.get(url, { params }).then(response => {
        commit('fetchSingleSuccess', response)
        return response
      }).catch(error => {
        commit('fetchSingleError', error)
        return Promise.reject(error)
      })
    }
  }

  if (hasFetchFields) {
    actions.fetchFields = ({ commit }, { id, params, url } = {}) => {
      commit('fetchFieldsStart')
      url = url || options.fetchFieldsURL || `/${resource}/${id}/`

      return api.get(`${url}/fields/`, { params }).then(response => {
        commit('fetchFieldsSuccess', response)
        return response
      }).catch(error => {
        commit('fetchFieldsError', error)
        return Promise.reject(error)
      })
    }
  }

  if (hasCreate) {
    actions.create = ({ commit }, { payload, url } = {}) => {
      commit('createStart')
      url = url || `/${resource}/`

      return api.post(url, payload).then(response => {
        commit('createSuccess', response)
        return response
      }).catch(error => {
        commit('createError', error)
        return Promise.reject(error)
      })
    }
  }

  if (hasUpdate) {
    actions.update = ({ commit }, { id, payload } = {}) => {
      commit('updateStart')

      return api.patch(`/${resource}/${id}`, payload).then(response => {
        commit('updateSuccess', response)
        return response
      }).catch(error => {
        commit('updateError', error)
        return Promise.reject(error)
      })
    }
  }

  if (hasReplace) {
    actions.replace = ({ commit }, { id, payload, url } = {}) => {
      commit('replaceStart')
      url = url || options.replaceURL || `/${resource}/${id}/`

      return api.put(url, payload).then(response => {
        commit('replaceSuccess', response)
        return response
      }).catch(error => {
        commit('replaceError', error)
        return Promise.reject(error)
      })
    }
  }

  if (hasDestroy) {
    actions.destroy = ({ commit }, { id, params } = {}) => {
      commit('destroyStart')

      return api.delete(`/${resource}/${id}/`, { params }).then(response => {
        commit('destroySuccess', id)
        return response
      }).catch(error => {
        commit('destroyError', error)
        return Promise.reject(error)
      })
    }
  }

  return {
    namespaced: true,

    state: stateData,
    getters,
    mutations,
    actions
  }
}
