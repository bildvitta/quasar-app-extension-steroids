import Vue from 'vue'

Vue.directive('test', (element, { arg: argument, value }) => {
  if (element && argument) {
    element.dataset.test = argument
  }

  if (element && value) {
    element.dataset.testKey = value
  }
})
