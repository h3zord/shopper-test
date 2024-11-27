import { RideMetricsContainer } from './styles'

interface RideMetricsProps {
  distance: number
  duration: string
}

export default function RideMetrics({ distance, duration }: RideMetricsProps) {
  function formatDistance(distanceInMeters: number) {
    return `${(distanceInMeters / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Quilômetros`
  }

  function formatDuration(durationInSeconds: string) {
    const seconds = parseInt(durationInSeconds.replace('s', ''), 10)

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${hours}h ${minutes}m`
  }

  return (
    <RideMetricsContainer>
      <p>Distância: {formatDistance(distance)}</p>

      <p>Tempo de viagem: {formatDuration(duration)}</p>
    </RideMetricsContainer>
  )
}
