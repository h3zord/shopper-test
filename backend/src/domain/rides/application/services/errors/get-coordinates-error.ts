export class GetCoordinatesError extends Error {
  constructor() {
    super('Erro ao obter coordenadas, verifique o endereço digitado')
  }
}
