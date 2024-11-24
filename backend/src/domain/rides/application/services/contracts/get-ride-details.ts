interface Coordinates {
  latitude: number
  longitude: number
}

interface GetRideDetailsProps {
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

export interface GetRideDetails {
  execute(props: GetRideDetailsProps): Promise<{
    distanceInMeters: number
    durationInSeconds: string
    fullRouteApiResponse: GetRideDetailsApiResponse
  }>
}
