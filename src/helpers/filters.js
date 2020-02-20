import Vue from 'vue'

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Private
function __format (value, token, options = {}) {
  return value ? format(parseISO(value), token, { locale: ptBR, ...options }) : ''
}

// Asset
function asset (value) {
  const environment = Vue.prototype.$environment
  const bucketURL = process.env.BUCKET_URL || (environment ? environment.bucketURL : location.origin)

  return value ? `${bucketURL}/${value}` : ''
}

// Date
function date (value, token = 'dd/MM/yyyy', options) {
  return __format(value, token, options)
}

function dateTime (value, token = 'dd/MM/yyyy HH:mm:ss', options) {
  return __format(value, token, options)
}

function humanDate (value, token = "dd 'de' MMMM 'de' yyyy 'as' HH:mm:ss", options) {
  return __format(value, token, options)
}

// Number
function money (value = 0, options = { style: 'currency', currency: 'BRL' }) {
  value = Number(value)
  return isNaN(value) ? '' : value.toLocaleString('pt-BR', options)
}

function percent (value = 0, places = 2) {
  value = Number(value)
  return value ? (value / 100).toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: places }) : ''
}

// Labels
function humanize (field = {}, value) {
  switch (field.type) {
    case 'boolean': return booleanLabel(value)
    case 'select': return optionLabel(field.options, value)
    case 'date': return date(value)
    case 'datetime': return dateTime(value)
    default: return value
  }
}

function optionLabel (options, value) {
  const option = options.find(option => option.value === value) || {}
  return option.label || ''
}

function booleanLabel (value) {
  return value ? 'sim' : 'não'
}

export {
  asset,
  booleanLabel,
  date,
  dateTime,
  humanDate,
  humanize,
  money,
  optionLabel,
  percent
}
