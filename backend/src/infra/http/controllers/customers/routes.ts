import express from 'express'

import { registerCustomerController } from './register-customer-controller'
import { findCustomerByEmailController } from './find-customer-by-email-controller'
import { findCustomerByIdController } from './find-customer-by-id-controller'

export const customerRouters = express.Router()

customerRouters.post('/login-customer', findCustomerByEmailController)
customerRouters.get('/find-customer/:customer_id', findCustomerByIdController)
customerRouters.post('/register-customer', registerCustomerController)
