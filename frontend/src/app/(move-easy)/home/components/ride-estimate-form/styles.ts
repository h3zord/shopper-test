'use client'

import { DefaultButton } from '@/app/components/styles'
import styled from 'styled-components'

export const RideEstimateFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 1rem;
  margin: auto;
`

export const RideEstimateFormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors['neutral-950']};

  & > input {
    border-radius: 0.5rem;
    border: 0.5px solid ${(props) => props.theme.colors['neutral-400']};
    padding: 0.5rem;
    color: ${(props) => props.theme.colors['neutral-100']};
    background-color: transparent;
    width: 15rem;

    &:focus {
      outline: 2px solid ${(props) => props.theme.colors['yellow-600']};
      border: 0.5px solid ${(props) => props.theme.colors['yellow-600']};
    }
  }
`
export const CalculateRideButton = styled(DefaultButton)`
  margin-left: 1rem;
`
