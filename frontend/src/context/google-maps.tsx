import React, { createContext, ReactNode, useContext } from 'react'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'

interface GoogleMapsProviderProps {
  children: ReactNode
}

const libraries: Libraries = ['places']

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({
  isLoaded: false,
})

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
    language: 'pt-BR',
  })

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export const useGoogleMaps = () => useContext(GoogleMapsContext)
