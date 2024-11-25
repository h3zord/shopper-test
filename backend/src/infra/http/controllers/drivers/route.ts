import express from 'express'
import { findDriverByIdController } from './find-driver-by-id-controller'

export const driverRouters = express.Router()

driverRouters.get('/find-driver/:id', findDriverByIdController)
