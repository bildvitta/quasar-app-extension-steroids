module.exports = function () {
  return [
    {
      default: 'http://localhost:8000',
      message: 'Qual o endereço base da API em modo de desenvolvimento?',
      name: 'developmentServerBaseURL',
      required: true,
      type: 'input',
    }
  ]
}
