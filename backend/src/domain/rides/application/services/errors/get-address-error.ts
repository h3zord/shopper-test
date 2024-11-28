export class GetAddressError extends Error {
  constructor() {
    super('Erro ao obter o endereço, verifique o endereço digitado')
  }
}
