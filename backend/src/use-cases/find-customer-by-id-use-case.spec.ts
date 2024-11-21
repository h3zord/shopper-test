import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCustomerRepository } from './repositories/in-memory/in-memory-customer-repository'
import { FindCustomerByIdUseCase } from './find-customer-by-id-use-case'
import { createCustomerInMemory } from '../utils/tests/create-customer-in-memory'
import { CustomerNotFound } from './errors/customer-not-found'

describe('Find user by id unit test', () => {
  let customerRepository: InMemoryCustomerRepository
  let sut: FindCustomerByIdUseCase

  beforeEach(async () => {
    customerRepository = new InMemoryCustomerRepository()
    sut = new FindCustomerByIdUseCase(customerRepository)
  })

  it('should be able to return a customer', async () => {
    const { id } = createCustomerInMemory(customerRepository)

    const { customer } = await sut.execute({ id })

    expect(customer.id).toEqual(id)
  })

  it('should not be able to return a customer with invalid id', async () => {
    createCustomerInMemory(customerRepository, { id: '1' })

    await expect(() => sut.execute({ id: '2' })).rejects.toBeInstanceOf(
      CustomerNotFound,
    )
  })
})
