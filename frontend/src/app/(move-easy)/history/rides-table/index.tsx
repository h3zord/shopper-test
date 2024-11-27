import { formatDistance } from '@/utils/format-distance'
import { Ride } from '../page'
import { formatDuration } from '@/utils/format-duration'
import { formatValue } from '@/utils/format-value'
import { formatDateTime } from '@/utils/format-datetime'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './styles'

interface RidesTableProps {
  rideList: Ride[]
}

export function RidesTable({ rideList }: RidesTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Motorista</TableHeader>
          <TableHeader>Origem</TableHeader>
          <TableHeader>Destino</TableHeader>
          <TableHeader>Distância (KM)</TableHeader>
          <TableHeader>Tempo</TableHeader>
          <TableHeader>Valor</TableHeader>
          <TableHeader>Data e hora</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rideList?.map((ride) => (
          <TableRow key={ride.id}>
            <TableCell>{ride.driver.name}</TableCell>
            <TableCell>{ride.origin}</TableCell>
            <TableCell>{ride.destination}</TableCell>
            <TableCell>{formatDistance(ride.distance)}</TableCell>
            <TableCell>{formatDuration(ride.duration)}</TableCell>
            <TableCell>{formatValue(ride.value)}</TableCell>
            <TableCell>{formatDateTime(ride.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
