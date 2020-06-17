export default function (element, selector) {
  while (element.parentElement) {
    if (!element) {
      continue
    }

    if (element && element.matches(selector)) {
      return element
    }

    element = element.parentElement
  }
}
