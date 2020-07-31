import humps from 'humps'

export default async ({ Vue }) => {
  const axios = Vue.prototype.$axios
  const environment = Vue.prototype.$environment
  axios.defaults.baseURL = process.env.SERVER_BASE_URL || (environment ? environment.serverBaseURL : '')

  // Transformers
  axios.defaults.transformResponse = [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ]

  axios.defaults.transformRequest = [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
}
