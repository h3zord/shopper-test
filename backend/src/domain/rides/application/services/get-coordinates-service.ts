import axios from 'axios'

import { GetCoordinatesError } from './errors/get-coordinates-error'

interface Coordinates {
  latitude: number
  longitude: number
}

interface convertAddressToCoordinatesResponse extends Coordinates {}

interface GetCoordinatesServiceProps {
  originAddress: string
  destinationAddress: string
}

interface GetCoordinatesServiceResponse {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

export class GetCoordinatesService {
  private static async convertAddressToCoordinates(
    address: string,
  ): Promise<convertAddressToCoordinatesResponse> {
    const googleMapsApiKey = 'AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY'

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
        throw new Error(`Geocoding error: ${response.data.status}`)
      }
    } catch (error) {
      throw new GetCoordinatesError(error)
    }
  }

  static async execute({
    originAddress,
    destinationAddress,
  }: GetCoordinatesServiceProps): Promise<GetCoordinatesServiceResponse> {
    try {
      const originCoordinates =
        await this.convertAddressToCoordinates(originAddress)

      const destinationCoordinates =
        await this.convertAddressToCoordinates(destinationAddress)

      return {
        originCoordinates,
        destinationCoordinates,
      }
    } catch (error) {
      throw new GetCoordinatesError(error)
    }
  }
}

// const originAddress = 'Rua das Flores, 123, São Paulo, Brasil'
// const destinationAddress = 'Avenida Paulista, 1000, São Paulo, Brasil'

// getCoordinatesService({ originAddress, destinationAddress })
//   .then((coordinates) => {
//     console.log('Coordenadas de origem:', coordinates!.originCoordinates)
//     console.log('Coordenadas de destino:', coordinates!.destinationCoordinates)
//   })
//   .catch((error) => console.error(error))
