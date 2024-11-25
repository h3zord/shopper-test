interface Coordinates {
  latitude: number
  longitude: number
}

interface GetAddressProps {
  originCoordinates: Coordinates
  destinationCoordinates: Coordinates
}

export interface GetAddress {
  execute(props: GetAddressProps): Promise<{
    originAddress: string
    destinationAddress: string
  }>
}
