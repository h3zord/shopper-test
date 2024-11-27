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
    picture: string
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
      const response = await api.patch('/ride/confirm', {
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

      console.log(response.data)

      router.push('/history')
    } catch (error) {
      if (error instanceof AxiosError) {
        setAxiosErrorMessage(error.response?.data.error_description)
      }

      console.error(error)
    }
  }

  return (
    <>
      <DriverCardContainer>
        {!hasDriverOptions ? (
          <DriverCard>
            <Image
              src="/homer-simpson.webp"
              width={250}
              alt="Driver picture"
              height={130}
            />
            <span>Homer Simpson</span>

            <p>
              Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o
              passeio, com direito a rosquinhas e boas risadas (e talvez alguns
              desvios).
            </p>

            <p>Veículo: Plymouth Valiant 1973 rosa e enferrujado.</p>

            <DriverReviewContainer>
              <p>Avaliações:</p>

              <Rating value={2} readOnly />

              <p>
                Motorista simpático, mas errou o caminho 3 vezes. O carro cheira
                a donuts.
              </p>
            </DriverReviewContainer>

            <PriceContent>Preço: {formatValue(78.66)}</PriceContent>

            <ConfirmRideButton
              onClick={() =>
                handleConfirmRideButton({
                  driverId: 1,
                  driverName: 'Homer Simpson',
                  rideValue: 78.66,
                })
              }
            >
              Selecionar Motorista
            </ConfirmRideButton>
          </DriverCard>
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
