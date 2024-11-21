import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCustomersRepository } from './repositories/in-memory/in-memory-customers-repository'
import { createCustomerInMemory } from '../utils/tests/create-customer-in-memory'
import { CustomerNotFound } from './errors/customer-not-found'
import { FindCustomerByEmailUseCase } from './find-customer-by-email-use-case'

describe('Find customer by email unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: FindCustomerByEmailUseCase

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new FindCustomerByEmailUseCase(customersRepository)
  })

  it('should be able to return a customer', async () => {
    const { email } = createCustomerInMemory(customersRepository)

    const { customer } = await sut.execute({ email })

    expect(customer.email).toEqual(email)
  })

  it('should not be able to return a customer with invalid email', async () => {
    createCustomerInMemory(customersRepository, { email: 'test@test.com' })

    await expect(() =>
      sut.execute({ email: 'invalid@email.com' }),
    ).rejects.toBeInstanceOf(CustomerNotFound)
  })
})
