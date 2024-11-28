'use client'

import { DefaultButton, DefaultInput } from '@/app/components/styles'
import styled from 'styled-components'

export const SearchHistoryFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
`
export const SearchHistoryFormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors['neutral-950']};
  margin-top: 1rem;

  & > h3 {
    color: ${(props) => props.theme.colors['yellow-600']};
  }
`

export const RideHistoryInput = styled(DefaultInput)`
  width: 15rem;
`

export const StyledSelect = styled.select`
  padding: 0.5rem;
  width: 15rem;
  border: 1px solid ${(props) => props.theme.colors['neutral-400']};
  border-radius: 8px;
  background-color: transparent;
  font-size: ${(props) => props.theme.fonts['text-base']};
  color: ${(props) => props.theme.colors['neutral-100']};

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors['yellow-600']};
    border-color: ${(props) => props.theme.colors['yellow-600']};
  }

  & > option {
    color: ${(props) => props.theme.colors['neutral-100']};
    background-color: ${(props) => props.theme.colors['neutral-800']};
  }
`

export const SearchRidesButton = styled(DefaultButton)`
  margin-left: 1rem;
`
