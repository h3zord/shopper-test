import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCustomersRepository } from '../../../../tests/repositories/in-memory-customers-repository'
import { InMemoryDriversRepository } from '../../../../tests/repositories/in-memory-drivers-repository'
import { CustomerNotFound } from './errors/customer-not-found'
import { InMemoryRidesRepository } from '../../../../tests/repositories/in-memory-rides-repository'
import { GetRidesUseCase } from './get-rides-use-case'
import { GetAddressService } from '../services/get-address-service'
import { createCustomerInMemory } from '../../../../tests/factories/create-customer-in-memory'
import { createDriverInMemory } from '../../../../tests/factories/create-driver-in-memory'
import { createRideInMemory } from '../../../../tests/factories/create-ride-in-memory'
import { InvalidDriver } from './errors/invalid-driver'

describe('Get rides unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let driversRepository: InMemoryDriversRepository
  let ridesRepository: InMemoryRidesRepository
  let getAddressService: GetAddressService
  let customerId: string

  let sut: GetRidesUseCase

  const originAddress =
    'R. das Flôres, 123 - Vila dos Palmares, São Paulo - SP, 12345-678, Brasil'

  const destinationAddress =
    'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100, Brasil'

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    driversRepository = new InMemoryDriversRepository()
    ridesRepository = new InMemoryRidesRepository(driversRepository)
    getAddressService = new GetAddressService()

    vi.spyOn(getAddressService, 'execute').mockResolvedValue({
      originAddress,
      destinationAddress,
    })

    sut = new GetRidesUseCase(
      getAddressService,
      customersRepository,
      driversRepository,
      ridesRepository,
    )

    const customer = createCustomerInMemory(customersRepository, {
      id: '1',
    })

    customerId = customer.id

    const firstDriver = createDriverInMemory(driversRepository, {
      id: 1,
      minimumMeters: 10000,
    })

    const secondDriver = createDriverInMemory(driversRepository, {
      id: 2,
      minimumMeters: 10000,
    })

    createRideInMemory(ridesRepository, {
      customerId,
      driverId: firstDriver.id,
    })

    createRideInMemory(ridesRepository, {
      customerId,
      driverId: secondDriver.id,
    })
  })

  it('should not be able to confirm ride when customer id is invalid', async () => {
    await expect(() =>
      sut.execute({
        customerId: '2',
        driverId: 1,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFound)
  })

  it('should not be able to confirm ride when driver id is invalid', async () => {
    await expect(() =>
      sut.execute({
        customerId,
        driverId: 3,
      }),
    ).rejects.toBeInstanceOf(InvalidDriver)
  })

  it('it should be able to return a list with ride details', async () => {
    const response = await sut.execute({
      customerId,
    })

    expect(response.customer_id).toEqual('1')
    expect(response.rides).toHaveLength(2)
    expect(response.rides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          date: expect.any(Date),
          origin:
            'R. das Flôres, 123 - Vila dos Palmares, São Paulo - SP, 12345-678, Brasil',
          destination:
            'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100, Brasil',
          distance: 32694,
          duration: '4676s',
          driver: expect.objectContaining({
            id: 1,
            name: expect.any(String),
          }),
          value: 32.69,
        }),
        expect.objectContaining({
          id: 2,
          date: expect.any(Date),
          origin:
            'R. das Flôres, 123 - Vila dos Palmares, São Paulo - SP, 12345-678, Brasil',
          destination:
            'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100, Brasil',
          distance: 32694,
          duration: '4676s',
          driver: expect.objectContaining({
            id: 2,
            name: expect.any(String),
          }),
          value: 32.69,
        }),
      ]),
    )
  })

  it('it should be able to return a list with ride details of a specific driver', async () => {
    const response = await sut.execute({
      customerId,
      driverId: 2,
    })

    expect(response.customer_id).toEqual('1')
    expect(response.rides).toHaveLength(1)
    expect(response.rides).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 2,
          date: expect.any(Date),
          origin:
            'R. das Flôres, 123 - Vila dos Palmares, São Paulo - SP, 12345-678, Brasil',
          destination:
            'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100, Brasil',
          distance: 32694,
          duration: '4676s',
          driver: expect.objectContaining({
            id: 2,
            name: expect.any(String),
          }),
          value: 32.69,
        }),
      ]),
    )
  })
})
