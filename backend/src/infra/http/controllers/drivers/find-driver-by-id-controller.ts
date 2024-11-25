import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindDriverByIdUseCase } from '../../../../domain/rides/application/use-cases/factories/make-find-driver-by-id-use-case'
import { DriverNotFound } from '../../../../domain/rides/application/use-cases/errors/driver-not-found'

export async function findDriverByIdController(req: Request, res: Response) {
  const findDriverByIdParamsSchema = z.object({
    id: z.number(),
  })

  const { id } = findDriverByIdParamsSchema.parse(req.params)

  const findDriverByIdUseCase = makeFindDriverByIdUseCase()

  try {
    const { driver } = await findDriverByIdUseCase.execute({
      id,
    })

    return res.status(200).json({ driver })
  } catch (error) {
    if (error instanceof DriverNotFound) {
      return res.status(404).json({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: error.message,
      })
    }

    throw error
  }
}
