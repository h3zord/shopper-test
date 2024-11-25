import axios from 'axios'

import { GetAddressError } from './errors/get-address-error'
import { GetAddress } from './contracts/get-adress'

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
    const googleMapsApiKey = 'AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY'

    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

    const url = `${baseUrl}?latlng=${coordinates.latitude},${coordinates.longitude}&key=${googleMapsApiKey}`

    try {
      const response = await axios.get(url)

      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address

        return {
          address,
        }
      } else {
        throw new Error(`Reverse geocoding error: ${response.data.status}`)
      }
    } catch (error) {
      throw new GetAddressError(error)
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
      throw new GetAddressError(error)
    }
  }
}

// const getAddressService = new GetAddressService()

// getAddressService
//   .execute({
//     originCoordinates: { latitude: -23.55052, longitude: -46.633308 },
//     destinationCoordinates: { latitude: -22.906847, longitude: -43.172896 },
//   })
//   .then((result) => {
//     console.log('Origin Address:', result.originAddress)
//     console.log('Destination Address:', result.destinationAddress)
//   })
//   .catch((error) => {
//     console.error('Error fetching addresses:', error.message)
//   })
