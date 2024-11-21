import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCustomersRepository } from './repositories/in-memory/in-memory-customers-repository'
import { RegisterUseCase } from './register-use-case'

describe('Register customer id unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: RegisterUseCase

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new RegisterUseCase(customersRepository)
  })

  it('should be able to create a new customer', async () => {
    const { customer } = await sut.execute({
      name: 'John Doe',
      email: 'test@test.com',
    })

    expect(customer.id).toEqual(expect.any(String))
    expect(customer.email).toEqual('test@test.com')
  })
})
