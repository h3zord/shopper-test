import { Request, Response } from 'express'
import { z } from 'zod'
import { makeRideConfirmUseCase } from '../../../../domain/rides/application/use-cases/factories/make-ride-confirm-use-case'
import { handleControllerErrors } from '../../errors/handle-controller-errors'

export async function rideConfirmController(req: Request, res: Response) {
  const rideConfirmBodySchema = z.object({
    customer_id: z.string(),
    origin: z.string(),
    destination: z.string(),
    distance: z.number(),
    duration: z
      .string()
      .refine((value) => /^\d+s$/.test(value), {
        message: "Duration must be in the format '<number>s'",
      })
      .transform((value) => Number(value.replace('s', ''))),
    driver: z.object({
      id: z.number(),
      name: z.string(),
    }),
    value: z.number(),
  })

  const {
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  } = rideConfirmBodySchema.parse(req.body)

  const rideConfirmUseCase = makeRideConfirmUseCase()

  try {
    await rideConfirmUseCase.execute({
      customerId: customer_id,
      originAddress: origin,
      destinationAddress: destination,
      distanceInMeters: distance,
      durationInSeconds: duration,
      driverId: driver.id,
      value,
    })

    return res.status(200).json({ sucess: true })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
