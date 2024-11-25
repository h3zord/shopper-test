import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindCustomerByIdUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-customer-by-id-use-case'
import { handleControllerErrors } from '../errors/handle-controller-errors'

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
    handleControllerErrors(error, res)
  }
}
