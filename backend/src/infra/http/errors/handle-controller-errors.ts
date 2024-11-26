import { Response } from 'express'
import { CustomerAlreadyExists } from '../../../domain/rides/application/use-cases/errors/customer-already-exsists'
import { CustomerNotFound } from '../../../domain/rides/application/use-cases/errors/customer-not-found'
import { DriverNotFound } from '../../../domain/rides/application/use-cases/errors/driver-not-found'
import { InvalidDriver } from '../../../domain/rides/application/use-cases/errors/invalid-driver'
import { NoRidesFound } from '../../../domain/rides/application/use-cases/errors/no-rides-found'
import { InvalidDistance } from '../../../domain/rides/application/use-cases/errors/invalid-distance'
import { InvalidData } from '../../../domain/rides/application/use-cases/errors/invalid-data'

export function handleControllerErrors(error: unknown, res: Response) {
  if (error instanceof CustomerAlreadyExists) {
    return res.status(409).json({
      error_code: 'CUSTOMER_ALREADY_EXISTS',
      error_description: error.message,
    })
  }

  if (error instanceof CustomerNotFound) {
    return res.status(404).json({
      error_code: 'CUSTOMER_NOT_FOUND',
      error_description: error.message,
    })
  }

  if (error instanceof DriverNotFound) {
    return res.status(404).json({
      error_code: 'DRIVER_NOT_FOUND',
      error_description: error.message,
    })
  }

  if (error instanceof InvalidDriver) {
    return res.status(400).json({
      error_code: 'INVALID_DRIVER',
      error_description: error.message,
    })
  }

  if (error instanceof NoRidesFound) {
    return res.status(404).json({
      error_code: 'NO_RIDES_FOUND',
      error_description: error.message,
    })
  }

  if (error instanceof InvalidDistance) {
    return res.status(406).json({
      error_code: 'INVALID_DISTANCE',
      error_description: error.message,
    })
  }

  if (error instanceof InvalidData) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.message,
    })
  }

  throw error
}
