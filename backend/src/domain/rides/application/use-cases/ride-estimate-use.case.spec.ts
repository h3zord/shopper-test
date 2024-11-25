import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FindDriverByMinDistanceUseCase } from './find-drivers-by-min-distance-use-case'
import { InMemoryCustomersRepository } from '../../../../tests/repositories/in-memory-customers-repository'
import { RideEstimateUseCase } from './ride-estimate-use.case'
import { GetCoordinatesService } from '../services/get-coordinates-service'
import { GetRideDetailsService } from '../services/get-ride-details-service'
import { InMemoryDriversRepository } from '../../../../tests/repositories/in-memory-drivers-repository'
import { InvalidData } from './errors/invalid-data'
import { CustomerNotFound } from './errors/customer-not-found'
import { createCustomerInMemory } from '../../../../tests/factories/create-customer-in-memory'
import { createDriverInMemory } from '../../../../tests/factories/create-driver-in-memory'

describe('Ride estimate unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let driversRepository: InMemoryDriversRepository
  let getCoordinatesService: GetCoordinatesService
  let getRideDetailsService: GetRideDetailsService
  let findDriversByMinDistanceUseCase: FindDriverByMinDistanceUseCase
  let customerId: string

  let sut: RideEstimateUseCase

  const originAddress = 'Rua das Flores, 123, São Paulo, Brasil'
  const destinationAddress = 'Avenida Paulista, 1000, São Paulo, Brasil'

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    driversRepository = new InMemoryDriversRepository()
    getCoordinatesService = new GetCoordinatesService()
    getRideDetailsService = new GetRideDetailsService()
    findDriversByMinDistanceUseCase = new FindDriverByMinDistanceUseCase(
      driversRepository,
    )

    vi.spyOn(getCoordinatesService, 'execute').mockResolvedValue({
      originCoordinates: { latitude: 37.7749, longitude: -122.4194 },
      destinationCoordinates: { latitude: 34.0522, longitude: -118.2437 },
    })

    vi.spyOn(getRideDetailsService, 'execute').mockResolvedValue({
      distanceInMeters: 615000,
      durationInSeconds: '24000s',
      fullRouteApiResponse: {
        routes: [{ distanceMeters: 615000, duration: '24000s' }],
      },
    })

    sut = new RideEstimateUseCase(
      getCoordinatesService,
      getRideDetailsService,
      findDriversByMinDistanceUseCase,
      customersRepository,
    )

    const { id } = createCustomerInMemory(customersRepository, {
      id: '1',
    })

    customerId = id
  })

  it('should not be able to return ride estimate when origin adress is equal destination adress', async () => {
    await expect(() =>
      sut.execute({
        customerId,
        originAddress,
        destinationAddress: originAddress,
      }),
    ).rejects.toBeInstanceOf(InvalidData)
  })

  it('should not be able to return ride estimate when customer id is invalid', async () => {
    await expect(() =>
      sut.execute({
        customerId: '2',
        originAddress,
        destinationAddress,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFound)
  })

  it('should be able to return an object containing details about the ride estimate', async () => {
    createDriverInMemory(driversRepository)

    const response = await sut.execute({
      customerId,
      originAddress,
      destinationAddress,
    })

    expect(response.origin).toEqual(
      expect.objectContaining({
        latitude: 37.7749,
        longitude: -122.4194,
      }),
    )

    expect(response.destination).toEqual(
      expect.objectContaining({
        latitude: 34.0522,
        longitude: -118.2437,
      }),
    )

    expect(response.distance).toEqual(615000)
    expect(response.duration).toEqual('24000s')

    expect(response.options).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          vehicle: expect.any(String),
          review: expect.objectContaining({
            rating: expect.any(Number),
            comment: expect.any(String),
          }),
          value: expect.any(Number),
        }),
      ]),
    )

    expect(response.routeResponse).toEqual(
      expect.objectContaining({
        routes: expect.arrayContaining([
          expect.objectContaining({
            distanceMeters: 615000,
            duration: '24000s',
          }),
        ]),
      }),
    )
  })
})
