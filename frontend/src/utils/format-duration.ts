export function formatDuration(durationInSeconds: string) {
  const seconds = parseInt(durationInSeconds.replace('s', ''), 10)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return `${hours}h ${minutes}m`
}
