import { createTheme } from '@mui/material'
import { MuiButtonComponent, MuiTabComponent, TypographyComponent } from 'Theme/Components'
import { ERROR_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from 'Constants/Colors'

export const theme = createTheme({
  palette: {
    primary: PRIMARY_COLOR,
    error: ERROR_COLOR,
    secondary: SECONDARY_COLOR,
    text: TEXT_COLOR,
    background: {
      default: '#fff',
      paper: '#F7F7F7',
    },
    divider: '#F7F7F7',
  },
  components: {
    MuiButton: MuiButtonComponent(),
    MuiTab: MuiTabComponent(),
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          '&.box-shadow': {
            boxShadow: '0 14px 24px rgba(20, 23, 38, 0.12)',
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          padding: 16,
          borderRadius: 10,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiPaper-root': {
            boxShadow: '0 4px 64px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#fff',
          },
        },
      },
    },
  },
  typography: TypographyComponent(),
})
