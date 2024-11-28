import axios from 'axios'

import { GetCoordinatesError } from './errors/get-coordinates-error'
import { GetCoordinates } from './contracts/get-coordinates'
import { InvalidData } from '../use-cases/errors/invalid-data'
import { env } from '../../../../infra/env'

interface Coordinates {
  latitude: number
  longitude: number
}

interface GetCoordinatesServiceProps {
  originAddress: string
  destinationAddress: string
}

interface GetCoordinatesServiceResponse {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

export class GetCoordinatesService implements GetCoordinates {
  private async convertAddressToCoordinates(address: string) {
    const googleMapsApiKey = env.GOOGLE_API_KEY

    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

    const url = `${baseUrl}?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`

    try {
      const response = await axios.get(url)

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location

        return {
          latitude: location.lat,
          longitude: location.lng,
        }
      } else {
        throw new GetCoordinatesError()
      }
    } catch (error) {
      console.error(error)

      throw new GetCoordinatesError()
    }
  }

  async execute({
    originAddress,
    destinationAddress,
  }: GetCoordinatesServiceProps): Promise<GetCoordinatesServiceResponse> {
    try {
      const originCoordinates =
        await this.convertAddressToCoordinates(originAddress)

      const destinationCoordinates =
        await this.convertAddressToCoordinates(destinationAddress)

      if (
        originCoordinates.latitude === destinationCoordinates.latitude &&
        originCoordinates.longitude === destinationCoordinates.longitude
      ) {
        throw new InvalidData()
      }

      return {
        originCoordinates,
        destinationCoordinates,
      }
    } catch (error) {
      console.error(error)

      throw new GetCoordinatesError()
    }
  }
}
