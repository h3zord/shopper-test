'use client'

import Cookies from 'js-cookie'
import {
  CalculateRideButton,
  RideEstimateFormContainer,
  RideEstimateFormContent,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { AxiosError } from 'axios'
import { ErrorContainer } from '@/app/components/styles'
import { RideInformations } from '../../page'

interface RideEstimateFormProps {
  setRideInformations: Dispatch<SetStateAction<RideInformations>>
}

export function RideEstimateForm({
  setRideInformations,
}: RideEstimateFormProps) {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState(null)

  const rideEstimateFormSchema = z.object({
    customerId: z.string().uuid({ message: 'Informe um ID válido' }),
    originAddress: z.string({
      message: 'Informe um endereço de origem válido',
    }),
    destinationAddress: z.string({
      message: 'Informe um endereço de destino válido',
    }),
  })

  type RideEstimateFormSchema = z.infer<typeof rideEstimateFormSchema>

  const id = Cookies.get('customerId')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RideEstimateFormSchema>({
    resolver: zodResolver(rideEstimateFormSchema),
    defaultValues: {
      customerId: id,
      originAddress: 'Rua das Flores, 123, São Paulo, Brasil',
      destinationAddress: 'Avenida Paulista, 1000, São Paulo, Brasil',
    },
  })

  async function submitRideEstimateForm(data: RideEstimateFormSchema) {
    try {
      const response = await api.post<RideInformations>('/ride/estimate', {
        customer_id: data.customerId,
        origin: data.originAddress,
        destination: data.destinationAddress,
      })

      setAxiosErrorMessage(null)

      setRideInformations(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }
  }

  return (
    <>
      <RideEstimateFormContainer
        onSubmit={handleSubmit(submitRideEstimateForm)}
      >
        <RideEstimateFormContent>
          <h3>Sua identificação</h3>

          <input {...register('customerId')} />
        </RideEstimateFormContent>

        <RideEstimateFormContent>
          <h3>Onde você está?</h3>

          <input {...register('originAddress')} />
        </RideEstimateFormContent>
        <RideEstimateFormContent>
          <h3>Para onde você vai?</h3>

          <input {...register('destinationAddress')} />
        </RideEstimateFormContent>

        <CalculateRideButton disabled={isSubmitting}>
          Calcular percurso
        </CalculateRideButton>
      </RideEstimateFormContainer>

      <ErrorContainer style={{ marginTop: '0.5rem' }}>
        {errors.customerId?.message ||
          errors.originAddress?.message ||
          errors.destinationAddress?.message ||
          axiosErrorMessage}
      </ErrorContainer>
    </>
  )
}

// const originAddress = 'Rua das Flores, 123, São Paulo, Brasil'
// const destinationAddress = 'Avenida Paulista, 1000, São Paulo, Brasil'