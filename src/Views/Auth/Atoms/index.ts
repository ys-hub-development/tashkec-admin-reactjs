import { styled } from '@mui/material'

export const AuthSection = styled('div')(() => ({
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("/media/images/auth-bg.jpg")',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}))

export const AuthForm = styled('form')(() => ({
  maxWidth: 425,
  width: '100%',
  padding: '50px 38px 100px 38px',
  borderRadius: 16,
  boxShadow: '0 14px 20px rgba(20, 23, 38, 0.05)',
  backgroundColor: '#fff'
}))