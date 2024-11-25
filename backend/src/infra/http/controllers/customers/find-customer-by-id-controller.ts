import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindCustomerByIdUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-customer-by-id-use-case'
import { CustomerNotFound } from '../../../../domain/rides/application/use-cases/errors/customer-not-found'

export async function findCustomerByIdController(req: Request, res: Response) {
  const findCustomerByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findCustomerByIdParamsSchema.parse(req.params)

  const findCustomerByIdUseCase = makeFindCustomerByIdUseCase()

  try {
    const { customer } = await findCustomerByIdUseCase.execute({
      id,
    })

    return res.status(200).json({ customer })
  } catch (error) {
    if (error instanceof CustomerNotFound) {
      return res.status(404).json({
        error_code: 'CUSTOMER_NOT_FOUND',
        error_description: error.message,
      })
    }

    throw error
  }
}
