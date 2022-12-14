import { Stack, styled } from '@mui/material'

export const StyledHeader = styled('header')(() => ({
  position: 'fixed',
  left: 'var(--sidebar-width)',
  top: 0,
  right: 0,
  padding: '16px 30px 0 30px',
  height: 'var(--header-height)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  zIndex: 10,
  backgroundColor: 'var(--body-bg)',
}))

export const HeaderProfile = styled(Stack)(({ theme }) => ({
  minWidth: 155,
  height: 'var(--header-height)',
  borderRadius: 10,
  backgroundColor: theme.palette.background.default,
  fontSize: 14,
  color: 'var(--profile-color)',
  cursor: 'pointer'
}))
