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

function time (value, token = 'HH:mm', options) {
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
    case 'select': return selectLabel(field.options, value, field.multiple)
    case 'date': return date(value)
    case 'datetime': return dateTime(value)
    case 'time': return time(value)
    default: return value
  }
}

function selectLabel (options, value, multiple) {
  return multiple ? multipleOptionsLabel(options, value) : optionLabel(options, value)
}

function multipleOptionsLabel (options, value) {
  return value.map(itemValue => optionLabel(options, itemValue)).join('\n')
}

function optionLabel (options, value) {
  return (options.find(option => String(option.value) === String(value)) || {}).label || ''
}

function parseValue (value) {
  try { return JSON.parse(value) } catch { return value }
}

function booleanLabel (value) {
  return JSON.parse(value) ? 'sim' : 'não'
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
  parseValue,
  percent
}
