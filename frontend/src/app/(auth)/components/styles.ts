'use client'

import { DefaultButton, DefaultInput } from '@/app/components/styles'
import styled from 'styled-components'

export const AuthContainer = styled.section`
  background-color: ${(props) => props.theme.colors['neutral-950']};
  position: relative;
  display: flex;
`

export const AuthContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  max-width: 20rem;

  & > h2 {
    color: ${(props) => props.theme.colors['neutral-100']};
  }

  & > p {
    color: ${(props) => props.theme.colors['neutral-400']};
    font-size: ${(props) => props.theme.fonts['text-base']};
  }
`

export const SwitchRouteButton = styled.button`
  all: unset;
  position: absolute;
  right: 2rem;
  top: 2rem;
  margin-left: auto;
  color: ${(props) => props.theme.colors['neutral-100']};
  display: block;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors['yellow-600']};
  }
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;

  & > label {
    font-weight: 700;
    text-align: left;
    color: ${(props) => props.theme.colors['neutral-300']};
  }

  & > input {
    border-radius: 0.5rem;
    border: 0.5px solid ${(props) => props.theme.colors['neutral-400']};
    padding: 0.5rem;
    color: ${(props) => props.theme.colors['neutral-100']};
    background-color: transparent;

    &:focus {
      outline: 2px solid ${(props) => props.theme.colors['yellow-600']};
      border: 0.5px solid ${(props) => props.theme.colors['yellow-600']};
    }
  }
`

export const AuthenticateInput = styled(DefaultInput)``

export const AuthenticateButton = styled(DefaultButton)`
  margin-top: 0.5rem;
`
