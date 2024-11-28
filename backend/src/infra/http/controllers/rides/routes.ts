import express from 'express'

import { rideEstimateController } from './ride-estimate-controller'
import { rideConfirmController } from './ride-confirm-controller'
import { getRidesController } from './get-rides-controller'

export const rideRouters = express.Router()

rideRouters.post('/ride/estimate', rideEstimateController)
rideRouters.patch('/ride/confirm', rideConfirmController)
rideRouters.get('/ride/:customer_id', getRidesController)
