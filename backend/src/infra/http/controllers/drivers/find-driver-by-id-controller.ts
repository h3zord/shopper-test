import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindDriverByIdUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-driver-by-id-use-case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

export async function findDriverByIdController(req: Request, res: Response) {
  const findDriverByIdParamsSchema = z.object({
    driver_id: z.coerce.number(),
  })

  const { driver_id } = findDriverByIdParamsSchema.parse(req.params)

  const findDriverByIdUseCase = makeFindDriverByIdUseCase()

  try {
    const { driver } = await findDriverByIdUseCase.execute({
      id: driver_id,
    })

    return res.status(200).json({ driver })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
