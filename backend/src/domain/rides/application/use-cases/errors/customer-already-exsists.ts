export class CustomerAlreadyExists extends Error {
  constructor() {
    super('Cliente já cadastrado no banco de dados')
  }
}
