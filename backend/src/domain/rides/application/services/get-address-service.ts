import axios from 'axios'

import { GetAddressError } from './errors/get-address-error'
import { GetAddress } from './contracts/get-adress'
import { env } from '../../../../infra/env'

interface Coordinates {
  latitude: number
  longitude: number
}

interface convertCoordinatesToAddressResponse {
  address: string
}

interface GetAddressServiceProps {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

interface GetAddressServiceResponse {
  originAddress: string
  destinationAddress: string
}

export class GetAddressService implements GetAddress {
  private async convertCoordinatesToAddress(
    coordinates: Coordinates,
  ): Promise<convertCoordinatesToAddressResponse> {
    const googleMapsApiKey = env.GOOGLE_API_KEY

    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

    const url = `${baseUrl}?latlng=${coordinates.latitude},${coordinates.longitude}&key=${googleMapsApiKey}&language=pt`

    try {
      const response = await axios.get(url)

      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address

        return {
          address,
        }
      } else {
        throw new GetAddressError()
      }
    } catch (error) {
      console.error(error)

      throw new GetAddressError()
    }
  }

  async execute({
    originCoordinates,
    destinationCoordinates,
  }: GetAddressServiceProps): Promise<GetAddressServiceResponse> {
    try {
      const originAddress =
        await this.convertCoordinatesToAddress(originCoordinates)

      const destinationAddress = await this.convertCoordinatesToAddress(
        destinationCoordinates,
      )

      return {
        originAddress: originAddress.address,
        destinationAddress: destinationAddress.address,
      }
    } catch (error) {
      console.error(error)

      throw new GetAddressError()
    }
  }
}
