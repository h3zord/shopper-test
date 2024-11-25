import express from 'express'

import { registerCustomerController } from './register-customer-controller'

export const customerRouters = express.Router()

customerRouters.post('/register-customer', registerCustomerController)
