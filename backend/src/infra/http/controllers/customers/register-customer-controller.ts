import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRegisterCustomerUseCase } from '../../../../domain/rides/application/use-cases/factories/make-register-customer-use-case'
import { CustomerAlreadyExists } from '../../../../domain/rides/application/use-cases/errors/customer-already-exsists'

export async function registerCustomerController(req: Request, res: Response) {
  const registerCustomerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
  })

  const { name, email } = registerCustomerBodySchema.parse(req.body)

  const registerCustomerUseCase = makeRegisterCustomerUseCase()

  try {
    await registerCustomerUseCase.execute({
      name,
      email,
    })

    return res.status(201).json({ sucess: true })
  } catch (error) {
    if (error instanceof CustomerAlreadyExists) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
