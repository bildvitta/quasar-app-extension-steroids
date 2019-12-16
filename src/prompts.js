module.exports = function () {
  return [
    {
      default: 'http://localhost:8000',
      message: 'Qual o endereço base da API em modo de desenvolvimento?',
      name: 'serverBaseURL',
      required: true,
      type: 'input',
    },
    {
      message: 'Qual o endereço dos "assets"?',
      name: 'bucketURL',
      required: true,
      type: 'input'
    }
  ]
}
