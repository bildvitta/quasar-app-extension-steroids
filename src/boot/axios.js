import axios from 'axios'
import humps from 'humps'

export default async ({ Vue }) => {
  const environment = Vue.prototype.$environment

  // URL
  axios.defaults.baseURL = process.env.SERVER_BASE_URL || (environment ? environment.serverBaseURL : '')
  axios.defaults.withCredentials = true

  // Transformers
  axios.defaults.transformResponse = [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ]

  axios.defaults.transformRequest = [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]

  Vue.prototype.$axios = axios
}
