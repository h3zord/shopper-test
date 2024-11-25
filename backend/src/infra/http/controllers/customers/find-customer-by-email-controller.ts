import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindCustomerByEmailUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-customer-by-email-use-case'
import { CustomerNotFound } from '../../../../domain/rides/application/use-cases/errors/customer-not-found'

export async function findCustomerByEmailController(
  req: Request,
  res: Response,
) {
  const findCustomerByEmailBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = findCustomerByEmailBodySchema.parse(req.body)

  const findCustomerByEmailUseCase = makeFindCustomerByEmailUseCase()

  try {
    const { customer } = await findCustomerByEmailUseCase.execute({
      email,
    })

    return res.status(200).json({ id: customer.id })
  } catch (error) {
    if (error instanceof CustomerNotFound) {
      return res.status(400).json({ message: error.message })
    }

    throw error
  }
}
