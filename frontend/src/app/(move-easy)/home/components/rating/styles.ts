'use client'

import { Rating, RatingProps, styled } from '@mui/material'

export const BookRating = styled(Rating)<RatingProps>(() => ({
  '& .MuiRating-iconEmpty, .MuiRating-iconFilled': {
    color: '##facc15',
  },

  position: 'absolute',
  right: 0,
  top: 0,
}))
