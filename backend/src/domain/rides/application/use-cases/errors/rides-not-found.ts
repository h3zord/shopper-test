export class RidesNotFound extends Error {
  constructor() {
    super('Nenhum registro encontrado')
  }
}
