import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRegisterCustomerUseCase } from '../../../../domain/rides/application/use-cases/factories/make-register-customer-use-case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

export async function registerCustomerController(req: Request, res: Response) {
  const registerCustomerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
  })

  const { name, email } = registerCustomerBodySchema.parse(req.body)

  const registerCustomerUseCase = makeRegisterCustomerUseCase()

  try {
    const { customer } = await registerCustomerUseCase.execute({
      name,
      email,
    })

    return res.status(201).json({ customer })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
