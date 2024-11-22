import axios from 'axios'

import { GetRideDetailsError } from './errors/get-ride-details-error'

interface Coordinates {
  latitude: number
  longitude: number
}

interface GetRideDetailsServiceProps {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

interface GetRideDetailsServiceResponse {
  distance: number
  duration: string
}

export class GetRideDetailsService {
  static async execute({
    originCoordinates,
    destinationCoordinates,
  }: GetRideDetailsServiceProps): Promise<GetRideDetailsServiceResponse> {
    const googleMapsApiKey = 'AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY'

    const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json'

    const originString = `${originCoordinates.latitude},${originCoordinates.longitude}`
    const destinationString = `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`

    const url = `${baseUrl}?origins=${originString}&destinations=${destinationString}&key=${googleMapsApiKey}`

    try {
      const response = await axios.get(url)

      if (response.data.status === 'OK') {
        const element = response.data.rows[0].elements[0]

        if (element.status === 'OK') {
          const distance = element.distance.value
          const duration = element.duration.text

          return {
            distance,
            duration,
          }
        } else {
          throw new Error(`Distance matrix error: ${element.status}`)
        }
      } else {
        throw new Error(`Distance matrix error: ${response.data.status}`)
      }
    } catch (error) {
      throw new GetRideDetailsError(error)
    }
  }
}

// getRideDetails({
//   originCoordinates: { latitude: -23.4419306, longitude: -46.8068621 },
//   destinationCoordinates: { latitude: -23.5649224, longitude: -46.6519376 },
// })
//   .then((response) => {
//     console.log(response.distance)
//     console.log(response.duration)
//   })
//   .catch((error) => console.error(error))
