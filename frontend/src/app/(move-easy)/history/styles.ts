'use client'

import styled from 'styled-components'

export const HistoryContainer = styled.section`
  min-height: calc(100vh - 6.5rem);
  background-color: ${(props) => props.theme.colors['neutral-800']};
  padding: 1rem;

  & > h2 {
    text-align: center;
    margin-top: 1rem;
    color: ${(props) => props.theme.colors['neutral-950']};
  }
`
