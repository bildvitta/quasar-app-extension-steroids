import Vue from 'vue'
import { format } from 'date-fns'

function asset (value) {
  const environment = Vue.prototype.$environment
  const bucketURL = process.env.BUCKET_URL || (environment ? environment.bucketURL : location.origin)

  return value ? `${bucketURL}/${value}` : ''
}

function date (value) {
  return value ? format(new Date(value), 'dd/MM/yyyy') : ''
}

function dateTime (value) {
  return value ? format(new Date(value), 'dd/MM/yyyy HH:mm:ss') : ''
}

function humanDate (value) {
  return value ? format(new Date(value), "dd 'de' MMMM 'de' yyyy 'as' HH:mm:ss") : ''
}

function money (value = 0) {
  value = Number(value)
  return isNaN(value) ? '' : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function optionLabel (options, value) {
  const option = options.find(option => option.value === value) || {}
  return option.label || ''
}

function percent (value = 0, places = 2) {
  value = Number(value)
  return value ? (value / 100).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: places }) : ''
}

export {
  asset,
  date,
  dateTime,
  humanDate,
  money,
  optionLabel,
  percent
}