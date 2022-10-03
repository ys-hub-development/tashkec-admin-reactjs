import { styled } from '@mui/material'

export const StyledThead = styled('div')(() => ({
  display: 'flex',
}))

export const StyledTheadItem = styled('div')(({theme}) => ({
  lineHeight: '20px',
  color: theme.palette.text.secondary,
  fontSize: 14
}))
