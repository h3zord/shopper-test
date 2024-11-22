interface GetCoordinatesProps {
  originAddress: string
  destinationAddress: string
}

interface Coordinates {
  latitude: number
  longitude: number
}

export interface GetCoordinates {
  execute(props: GetCoordinatesProps): Promise<{
    originCoordinates: Coordinates
    destinationCoordinates: Coordinates
  }>
}
