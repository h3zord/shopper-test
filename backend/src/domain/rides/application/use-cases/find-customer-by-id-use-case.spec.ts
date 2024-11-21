import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCustomersRepository } from '../repositories/in-memory/in-memory-customers-repository'
import { FindCustomerByIdUseCase } from './find-customer-by-id-use-case'
import { createCustomerInMemory } from '../../../../utils/tests/create-customer-in-memory'
import { CustomerNotFound } from './errors/customer-not-found'

describe('Find customer by id unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: FindCustomerByIdUseCase

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new FindCustomerByIdUseCase(customersRepository)
  })

  it('should be able to return a customer', async () => {
    const { id } = createCustomerInMemory(customersRepository)

    const { customer } = await sut.execute({ id })

    expect(customer.id).toEqual(id)
  })

  it('should not be able to return a customer with invalid id', async () => {
    createCustomerInMemory(customersRepository, { id: '1' })

    await expect(() => sut.execute({ id: '2' })).rejects.toBeInstanceOf(
      CustomerNotFound,
    )
  })
})
