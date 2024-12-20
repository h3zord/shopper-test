import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCustomersRepository } from '../../../../tests/repositories/in-memory-customers-repository'
import { RegisterCustomerUseCase } from './register-customer-use-case'
import { CustomerAlreadyExists } from './errors/customer-already-exsists'
import { createCustomerInMemory } from '../../../../tests/factories/create-customer-in-memory'

describe('Register customer id unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: RegisterCustomerUseCase

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new RegisterCustomerUseCase(customersRepository)
  })

  it('should be able to create a new customer', async () => {
    const { customer } = await sut.execute({
      name: 'John Doe',
      email: 'test@test.com',
    })

    expect(customer.id).toEqual(expect.any(String))
    expect(customer.email).toEqual('test@test.com')
  })

  it('should not be able to create a new customer if the email is already registered', async () => {
    createCustomerInMemory(customersRepository, {
      email: 'test@test.com',
    })

    await expect(() =>
      sut.execute({ name: 'John Doe', email: 'test@test.com' }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExists)
  })
})
