import { Request, Response } from 'express'
import { handleControllerErrors } from '../../errors/handle-controller-errors'
import { makeGetAllDriversUseCase } from '../../../../domain/rides/application/use-cases/factories/make-get-all-drivers-use-case'

export async function getAllDriversController(_req: Request, res: Response) {
  const getAllDriversUseCase = makeGetAllDriversUseCase()

  try {
    const { driverList } = await getAllDriversUseCase.execute()

    return res.status(200).json({ driverList })
  } catch (error) {
    handleControllerErrors(error, res)
  }
}
