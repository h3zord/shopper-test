import 'express-async-errors'

import express from 'express'

import { zodErrorsMiddleware } from './http/middlewares/zod-errors'
import { customerRouters } from './http/controllers/customers/routes'
import { driverRouters } from './http/controllers/drivers/routes'
import { rideRouters } from './http/controllers/rides/routes'

export const app = express()

app.use(express.json())

app.use(customerRouters)
app.use(driverRouters)
app.use(rideRouters)

app.use(zodErrorsMiddleware)
