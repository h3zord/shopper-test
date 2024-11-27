'use client'

import React, { useState } from 'react'
import { LoadScript, Autocomplete, Libraries } from '@react-google-maps/api'

const libraries: Libraries = ['places']

export const AutocompleteInput = () => {
  const [address, setAddress] = useState('')

  let autocomplete: google.maps.places.Autocomplete | null

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    autocomplete = autocompleteInstance
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()

      setAddress(place.formatted_address || '')

      console.log(place.formatted_address)
    }
  }

  const handleConfirm = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      setAddress(place.formatted_address || address)
      console.log('Confirmed Address:', place.formatted_address || address)
    }
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY"
      libraries={libraries}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Digite um endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>

      <button onClick={handleConfirm}>aaa</button>
    </LoadScript>
  )
}
