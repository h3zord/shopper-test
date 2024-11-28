export function formatDistance(distanceInMeters: number) {
  return (distanceInMeters / 1000).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
