import express from 'express'

import { findDriverByIdController } from './find-driver-by-id-controller'
import { getAllDriversController } from './get-all-drivers-controller'

export const driverRouters = express.Router()

driverRouters.get('/find-driver/:driver_id', findDriverByIdController)
driverRouters.get('/get-drivers', getAllDriversController)
