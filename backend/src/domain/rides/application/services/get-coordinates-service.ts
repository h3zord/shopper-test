import axios from 'axios'

import { GetCoordinatesError } from './errors/get-coordinates-error'

async function convertAddressToCoordinates(address: string) {
  const googleMapsApiKey = 'AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`

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

interface GetCoordinatesProps {
  originAddress: string
  destinationAddress: string
}

export async function getCoordinatesService({
  originAddress,
  destinationAddress,
}: GetCoordinatesProps) {
  try {
    const originCoordinates = await convertAddressToCoordinates(originAddress)
    const destinationCoordinates =
      await convertAddressToCoordinates(destinationAddress)

    return {
      originCoordinates,
      destinationCoordinates,
    }
  } catch (error) {
    throw new GetCoordinatesError(error)
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
