export default function (validations, permitions = []) {
  if (!permitions) {
    return false
  }

  validations = Array.isArray(validations) ? validations : [validations]

  return validations.some(validation => permitions.find(permition => permition === validation))
}
