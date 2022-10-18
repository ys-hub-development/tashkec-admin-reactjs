import { Box, styled } from '@mui/material'

export const StyleWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - var(--header-height) - 48px)',
  width: '100%',
}))