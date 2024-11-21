export class GetCoordinatesError extends Error {
  constructor(error: unknown) {
    if (error instanceof Error) {
      super(`Erro ao obter coordenadas, ${error.message}`)
    } else {
      super('Erro desconhecido ao obter coordenadas')
    }
  }
}
