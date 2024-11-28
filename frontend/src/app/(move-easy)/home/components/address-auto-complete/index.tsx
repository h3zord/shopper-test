import React, { Dispatch, ReactNode, SetStateAction, useRef } from 'react'
import { StandaloneSearchBox } from '@react-google-maps/api'
import { useGoogleMaps } from '@/context/google-maps'

interface AutoCompleteInputProps {
  input: ReactNode
  saveAddress: Dispatch<SetStateAction<string>>
}

export function AutoCompleteInput({
  input,
  saveAddress,
}: AutoCompleteInputProps) {
  const { isLoaded } = useGoogleMaps()

  const inputRef = useRef<google.maps.places.SearchBox | null>(null)

  const handleOnPlacesChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces()

      if (places && places[0]?.formatted_address) {
        saveAddress(places[0].formatted_address)
      }
    }
  }

  if (!isLoaded) return <p>Carregando autocomplete...</p>

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handleOnPlacesChanged}
    >
      {input}
    </StandaloneSearchBox>
  )
}
