export class InvalidData extends Error {
  constructor() {
    super('Os dados fornecidos no corpo da requisição são inválidos')
  }
}
