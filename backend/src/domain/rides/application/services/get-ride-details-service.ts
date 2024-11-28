import axios from 'axios'

import { GetRideDetailsError } from './errors/get-ride-details-error'
import { GetRideDetails } from './contracts/get-ride-details'
import { env } from '../../../../infra/env'

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
  fullRouteApiResponse: GetRideDetailsApiResponse
}

export class GetRideDetailsService implements GetRideDetails {
  async execute({
    originCoordinates,
    destinationCoordinates,
  }: GetRideDetailsServiceProps): Promise<GetRideDetailsServiceResponse> {
    const googleMapsApiKey = env.GOOGLE_API_KEY

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
        fullRouteApiResponse: response.data,
      }
    } catch (error) {
      console.error(error)
      throw new GetRideDetailsError()
    }
  }
}
