export function formatDateTime(datetime: string | Date) {
  const date = new Date(datetime)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const formattedDate = date.toLocaleString('pt-BR', options)

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
