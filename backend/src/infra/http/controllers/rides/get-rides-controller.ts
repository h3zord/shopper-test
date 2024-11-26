import { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetRidesUseCase } from '../../../../domain/rides/application/use-cases/factories/make-get-rides-use-case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

export async function getRidesController(req: Request, res: Response) {
  const getRidesParamsSchema = z.object({
    customer_id: z.string(),
  })

  const getRidesQuerySchema = z.object({
    driver_id: z.coerce.number().optional(),
  })

  const { customer_id } = getRidesParamsSchema.parse(req.body)

  const { driver_id } = getRidesQuerySchema.parse(req.query)

  const getRidesUseCase = makeGetRidesUseCase()

  try {
    const ridesList = await getRidesUseCase.execute({
      customerId: customer_id,
      driverId: driver_id,
    })

    return res.status(200).json(ridesList)
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
