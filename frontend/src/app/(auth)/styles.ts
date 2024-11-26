'use client'

import styled from 'styled-components'

export const LayoutContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
`

export const LayoutContent = styled.div`
  background-color: ${(props) => props.theme.colors['neutral-800']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem;

  & > h2 {
    color: ${(props) => props.theme.colors['neutral-100']};
  }
`

export const WelcomeText = styled.p`
  font-size: ${(props) => props.theme.fonts['text-2xl']};
  color: ${(props) => props.theme.colors['neutral-300']};
  text-align: center;
  margin-bottom: 5rem;
`
