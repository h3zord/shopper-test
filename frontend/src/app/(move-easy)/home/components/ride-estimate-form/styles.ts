'use client'

import { DefaultButton, DefaultInput } from '@/app/components/styles'
import styled from 'styled-components'

export const RideEstimateFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 1rem;
`

export const RideEstimateFormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors['neutral-950']};

  & > h3 {
    color: ${(props) => props.theme.colors['yellow-600']};
  }
`

export const RideEstimateInput = styled(DefaultInput)`
  width: 15rem;
`

export const CalculateRideButton = styled(DefaultButton)`
  margin-left: 1rem;
`
