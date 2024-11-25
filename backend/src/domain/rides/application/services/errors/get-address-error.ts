export class GetAddressError extends Error {
  constructor(error: unknown) {
    if (error instanceof Error) {
      super(`Erro ao obter endereço, ${error.message}`)
    } else {
      super('Erro desconhecido ao obter endereço')
    }
  }
}
