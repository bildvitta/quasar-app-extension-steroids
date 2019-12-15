import axios from 'axios'
import humps from 'humps'

export default async ({ Vue, store }) => {
  // URL
  axios.defaults.baseURL = process.env.APIHOST || 'http://localhost:8000/'
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
