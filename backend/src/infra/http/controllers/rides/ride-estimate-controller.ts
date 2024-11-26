import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRideEstimateUseCase } from '../../../../domain/rides/application/use-cases/factories/make-ride-estimate-use.case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

export async function rideEstimateController(req: Request, res: Response) {
  const rideEstimateBodySchema = z.object({
    customer_id: z.string(),
    origin: z.string(),
    destination: z.string(),
  })

  const { customer_id, origin, destination } = rideEstimateBodySchema.parse(
    req.body,
  )

  const rideEstimateUseCase = makeRideEstimateUseCase()

  try {
    const rideEstimate = await rideEstimateUseCase.execute({
      customerId: customer_id,
      originAddress: origin,
      destinationAddress: destination,
    })

    return res.status(200).json(rideEstimate)
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
