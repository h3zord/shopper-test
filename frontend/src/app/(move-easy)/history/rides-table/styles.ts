'use client'

import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  overflow: hidden;
  margin-top: 1rem;
`
export const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors['neutral-100']};
`

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  color: ${(props) => props.theme.colors['neutral-950']};
  border: 1px solid #a3a3a3;
`

export const TableBody = styled.tbody``

export const TableRow = styled.tr``

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors['neutral-400']};
  text-align: left;
  color: ${(props) => props.theme.colors['neutral-100']};
`
