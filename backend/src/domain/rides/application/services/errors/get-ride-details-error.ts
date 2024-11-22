export class GetRideDetailsError extends Error {
  constructor(error: unknown) {
    if (error instanceof Error) {
      super(`Erro ao obter informações sobre o percurso, ${error.message}`)
    } else {
      super('Erro desconhecido ao obter informações sobre o percurso')
    }
  }
}
