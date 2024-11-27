import { RatingProps } from '@mui/material'
import { BookRating } from './styles'

export function Rating(ratingProps: RatingProps) {
  return <BookRating {...ratingProps} precision={0.5} />
}
