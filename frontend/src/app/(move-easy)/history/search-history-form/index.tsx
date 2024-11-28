'use client'

import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ErrorContainer } from '@/app/components/styles'
import { RideList } from '../page'
import {
  RideHistoryInput,
  SearchHistoryFormContainer,
  SearchHistoryFormContent,
  SearchRidesButton,
  StyledSelect,
} from './styles'

interface SearchHistoryFormProps {
  setRideList: Dispatch<SetStateAction<RideList>>
  customerId: string
}

interface DriverList {
  name: string
  id: number
  description: string
  vehicle: string
  rating: number
  comment: string
  pricePerKilometer: number
  minimumMeters: number
  createdAt: Date
}

export function SearchHistoryForm({
  setRideList,
  customerId,
}: SearchHistoryFormProps) {
  const [driverList, setDriverList] = useState<DriverList[]>([])
  const [axiosErrorMessage, setAxiosErrorMessage] = useState(null)

  const searchHistoryFormSchema = z.object({
    customerId: z.string().uuid({ message: 'Informe um ID válido' }),
    driverId: z.coerce.number().optional(),
  })

  type SearchHistoryFormSchema = z.infer<typeof searchHistoryFormSchema>

  const id = Cookies.get('customerId')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SearchHistoryFormSchema>({
    resolver: zodResolver(searchHistoryFormSchema),
    defaultValues: {
      customerId: id,
    },
  })

  async function getDrivers() {
    try {
      const response = await api.get('/get-drivers')

      setDriverList(response.data.driverList)

      setAxiosErrorMessage(null)
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }
  }

  const getRides = useCallback(async () => {
    try {
      const response = await api.get(`/ride/${id}`)

      setAxiosErrorMessage(null)
      setRideList(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      setRideList({
        customer_id: id || customerId,
        rides: [],
      })

      console.error(error)
    }
  }, [id, customerId, setRideList])

  useEffect(() => {
    getDrivers()
    getRides()
  }, [getRides])

  async function submitSearchHistoryForm(data: SearchHistoryFormSchema) {
    try {
      const response = await api.get(`/ride/${data.customerId}`, {
        params:
          data.driverId && data.driverId !== 0
            ? { driver_id: data.driverId }
            : {},
      })

      setAxiosErrorMessage(null)

      setRideList(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      setRideList({
        customer_id: id || customerId,
        rides: [],
      })

      console.error(error)
    }
  }

  return (
    <>
      <SearchHistoryFormContainer
        onSubmit={handleSubmit(submitSearchHistoryForm)}
      >
        <SearchHistoryFormContent>
          <h3>Sua identificação</h3>

          <RideHistoryInput {...register('customerId')} />
        </SearchHistoryFormContent>

        <SearchHistoryFormContent>
          <h3>Selecione um motorista</h3>

          <StyledSelect {...register('driverId')}>
            <option value="">Mostrar todos</option>

            {driverList?.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </StyledSelect>
        </SearchHistoryFormContent>

        <SearchRidesButton disabled={isSubmitting}>
          Buscar viagens
        </SearchRidesButton>
      </SearchHistoryFormContainer>

      <ErrorContainer style={{ marginTop: '1rem' }}>
        {errors.customerId?.message || axiosErrorMessage}
      </ErrorContainer>
    </>
  )
}
