'use client'

import styled from 'styled-components'

export const ErrorContainer = styled.p`
  font-size: ${(props) => props.theme.fonts['text-base']};
  color: ${(props) => props.theme.colors['red-500']};
  margin-top: 0.5rem;
  height: 1rem;
  text-align: center;
`
export const DefaultButton = styled.button`
  all: unset;
  color: ${(props) => props.theme.colors['neutral-100']};
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  transition: 0.2s;
  background-color: ${(props) => props.theme.colors['yellow-600']};

  &:hover:not([disabled]) {
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`
