export default function (validations, permissions = []) {
  if (!permissions) {
    return false
  }

  validations = Array.isArray(validations) ? validations : [validations]

  return validations.some(validation => permissions.find(permission => permission === validation))
}
