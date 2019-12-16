import Vue from 'vue'
import { date } from 'quasar'

export default async ({ Vue }) => {
  const environment = Vue.prototype.$environment

  Vue.filter('asset', value => {
    const bucketURL = process.env.BUCKET_URL || (environment ? environment.bucketURL : location.origin)
    return value ? `${bucketURL}/${value}` : ''
  })

  Vue.filter('date', value => {
    return value ? date.formatDate(value, 'DD/MM/YYYY') : ''
  })

  Vue.filter('dateTime', value => {
    return value ? date.formatDate(value, 'DD/MM/YYYY [-] HH:mm[h]') : ''
  })

  Vue.filter('humanDate', value => {
    return value ? date.formatDate(value, 'DD [de] MMMM [de] YYYY [as] HH:mm') : ''
  })

  Vue.filter('money', (value = 0) => {
    value = Number(value)
    return isNaN(value) ? '' : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  })

  Vue.filter('percent', (value, places = 2) => {
    return value ? (value / 100).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: places }) : ''
  })
}
