import { createTheme } from '@mui/material'

const primary = { main: '#6792F1', light: 'rgba(32, 99, 245, 0.1)'}
const error = {main: '#FF7F51', light: 'rgba(255, 120, 72, 0.1)'}
const text = {primary: '#1F1F1F', secondary: '#8992A9'}

export const theme = createTheme({
  palette: {
    primary: {
      main: primary.main,
      light: primary.light,
      dark: undefined
    },
    error: {
      main: error.main,
      light: error.light,
      dark: undefined
    },
    text: {
      primary: text.primary,
      secondary: text.secondary
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
  },
})