export class NoRidesFound extends Error {
  constructor() {
    super('Nenhum registro encontrado')
  }
}
