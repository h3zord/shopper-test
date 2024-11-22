import axios from 'axios'

import { GetRideDetailsError } from './errors/get-ride-details-error'
import { GetRideDetails } from './contracts/get-ride-details'

interface Coordinates {
  latitude: number
  longitude: number
}

interface GetRideDetailsServiceProps {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

interface Route {
  distanceMeters: number
  duration: string
}

interface GetRideDetailsApiResponse {
  routes: Route[]
}

interface GetRideDetailsServiceResponse {
  distanceInMeters: number
  durationInSeconds: string
  fullRouteResponse: GetRideDetailsApiResponse
}

export class GetRideDetailsService implements GetRideDetails {
  async execute({
    originCoordinates,
    destinationCoordinates,
  }: GetRideDetailsServiceProps): Promise<GetRideDetailsServiceResponse> {
    const googleMapsApiKey = 'AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY'

    const baseUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes'

    const bodyRequest = {
      origin: {
        location: {
          latLng: {
            latitude: originCoordinates.latitude,
            longitude: originCoordinates.longitude,
          },
        },
      },

      destination: {
        location: {
          latLng: {
            latitude: destinationCoordinates.latitude,
            longitude: destinationCoordinates.longitude,
          },
        },
      },

      routing_preference: 'TRAFFIC_AWARE',
      travel_mode: 'DRIVE',
    }

    try {
      const response = await axios.post<GetRideDetailsApiResponse>(
        baseUrl,
        bodyRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
            'X-Goog-Api-Key': googleMapsApiKey,
          },
        },
      )

      const { distanceMeters, duration } = response.data.routes[0]

      return {
        distanceInMeters: distanceMeters,
        durationInSeconds: duration,
        fullRouteResponse: response.data,
      }
    } catch (error) {
      throw new GetRideDetailsError(error)
    }
  }
}
// const getRideDetails = new GetRideDetailsService()

// getRideDetails
//   .execute({
//     originCoordinates: { latitude: -23.4419306, longitude: -46.8068621 },
//     destinationCoordinates: { latitude: -23.5649224, longitude: -46.6519376 },
//   })
//   .then((response) => {
//     console.log(response.distanceInMeters)
//     console.log(response.durationInSeconds)
//     console.log(response.fullRouteResponse)
//   })
//   .catch((error) => console.error(error))
