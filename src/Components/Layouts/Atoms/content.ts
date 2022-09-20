import { styled } from '@mui/material'

export const StyledContent = styled('div')(() => ({
  marginLeft: 'var(--sidebar-width)',
  marginTop: 'calc(var(--header-height) + 16px)',
  padding: '24px 30px',
}))

export const ContentWrapper = styled('div')(() => ({
  backgroundColor: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
  padding: '16px 24px',
}))
