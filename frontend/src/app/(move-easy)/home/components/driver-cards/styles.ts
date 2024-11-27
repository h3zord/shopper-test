'use client'

import { DefaultButton } from '@/app/components/styles'
import styled from 'styled-components'

export const DriverCardContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
`

export const DriverCard = styled.div`
  width: 350px;
  border: 1px solid ${(props) => props.theme.colors['yellow-400']};
  padding: 0.2rem;
  border-radius: 0.75rem;
  font-size: ${(props) => props.theme.fonts['text-sm']};
  color: ${(props) => props.theme.colors['neutral-100']};

  & > img {
    width: 100%;
    border-radius: 0.75rem;
  }

  & > span {
    text-align: center;
    display: block;
  }

  & > p {
    margin-top: 0.5rem;
  }
`

export const DriverReviewContainer = styled.div`
  position: relative;
  margin-top: 0.5rem;

  & > p {
    margin-top: 1rem;
  }
`

export const PriceContent = styled.p`
  text-align: center;
  text-decoration: underline;
  font-size: ${(props) => props.theme.fonts['text-base']};
`

export const ConfirmRideButton = styled(DefaultButton)`
  margin: auto;
  margin-top: 0.75rem;
  display: block;
`
