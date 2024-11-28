import { formatDistance } from '@/utils/format-distance'
import { RideMetricsContainer } from './styles'
import { formatDuration } from '@/utils/format-duration'

interface RideMetricsProps {
  distance: number
  duration: string
}

export function RideMetrics({ distance, duration }: RideMetricsProps) {
  return (
    <RideMetricsContainer>
      <p>Distância: {formatDistance(distance)} quilômetros</p>

      <p>Tempo de viagem: {formatDuration(duration)}</p>
    </RideMetricsContainer>
  )
}
