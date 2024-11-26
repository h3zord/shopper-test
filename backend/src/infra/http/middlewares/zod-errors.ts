import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function zodErrorsMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'Os dados fornecidos no corpo da requisição são inválidos',
    })
  }

  if (error instanceof Error) {
    return res.status(400).json({
      message: error.message,
    })
  }

  res.status(500).json({ message: 'Internal Server Error', error })

  next()
}
