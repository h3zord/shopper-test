import Image from 'next/image'
import Cookies from 'js-cookie'
import {
  ConfirmRideButton,
  DriverCard,
  DriverCardContainer,
  DriverReviewContainer,
  PriceContent,
} from './styles'
import { Rating } from '../rating'
import { ErrorContainer } from '@/app/components/styles'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { formatValue } from '@/utils/format-value'

interface DriverCardsProps {
  driverList: {
    id: number
    name: string
    description: string
    vehicle: string
    review: {
      rating: number
      comment: string
    }
    value: number
  }[]

  rideInformations: {
    origin: string
    destination: string
    distanceInMeters: number
    durationInSeconds: string
  }
}

interface HandleConfirmRideButtonProps {
  driverId: number
  driverName: string
  rideValue: number
}

export function DriverCards({
  driverList,
  rideInformations,
}: DriverCardsProps) {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState(null)

  const router = useRouter()

  const hasDriverOptions = driverList?.length > 0

  async function handleConfirmRideButton({
    driverId,
    driverName,
    rideValue,
  }: HandleConfirmRideButtonProps) {
    const id = Cookies.get('customerId')

    try {
      await api.patch('/ride/confirm', {
        customer_id: id,
        origin: rideInformations.origin,
        destination: rideInformations.destination,
        distance: rideInformations.distanceInMeters,
        duration: rideInformations.durationInSeconds,
        driver: {
          id: driverId,
          name: driverName,
        },
        value: rideValue,
      })

      setAxiosErrorMessage(null)

      router.push('/history')
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }
  }

  const getDriverImage = (id: number) => {
    switch (id) {
      case 1:
        return '/homer-simpson.webp'
      case 2:
        return '/dominic-toretto.jpg'
      case 3:
        return '/james-bond.webp'
      default:
        return ''
    }
  }

  return (
    <>
      <DriverCardContainer>
        {hasDriverOptions ? (
          driverList.map((driver) => (
            <DriverCard key={driver.id}>
              <Image
                src={getDriverImage(driver.id)}
                width={250}
                height={130}
                alt="Driver picture"
              />

              <span>{driver.name}</span>

              <p>{driver.description}</p>

              <p>Veículo: {driver.vehicle}</p>

              <DriverReviewContainer>
                <p>Avaliações:</p>

                <Rating value={driver.review.rating} readOnly />

                <p>{driver.review.comment}</p>
              </DriverReviewContainer>

              <PriceContent>Preço: {formatValue(driver.value)}</PriceContent>

              <ConfirmRideButton
                onClick={() =>
                  handleConfirmRideButton({
                    driverId: driver.id,
                    driverName: driver.name,
                    rideValue: driver.value,
                  })
                }
              >
                Selecionar Motorista
              </ConfirmRideButton>
            </DriverCard>
          ))
        ) : (
          <ErrorContainer>
            Nenhum motorista disponível para essa viagem
          </ErrorContainer>
        )}
      </DriverCardContainer>

      <ErrorContainer>{axiosErrorMessage}</ErrorContainer>
    </>
  )
}
