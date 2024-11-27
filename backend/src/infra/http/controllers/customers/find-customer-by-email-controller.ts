import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindCustomerByEmailUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-customer-by-email-use-case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

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

    res.cookie('customerId', customer.id, {
      sameSite: 'strict',
      secure: true,
    })

    return res.status(200).json({ customer })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
