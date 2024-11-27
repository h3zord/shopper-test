'use client'

import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100vw;
  background-color: ${(props) => props.theme.colors['neutral-950']};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 6.5rem;

  & > a {
    text-decoration: none;
  }
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem;

  & > h3 {
    color: ${(props) => props.theme.colors['neutral-100']};
  }
`

export const UserPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-right: 1rem;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & > span {
    color: ${(props) => props.theme.colors['neutral-100']};
    font-size: ${(props) => props.theme.fonts['text-base']};
  }
`

export const LogoutButton = styled.button`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme.colors['neutral-100']};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
`
