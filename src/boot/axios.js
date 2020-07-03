import humps from 'humps'

export default async ({ Vue }) => {
  const axios = Vue.prototype.$axios

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
