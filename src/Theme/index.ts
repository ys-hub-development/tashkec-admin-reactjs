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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '16px',

          input: {
            fontSize: 14,
            color: TEXT_COLOR.primary,
            fontWeight: 400,

            '&::placeholder': {
              color: TEXT_COLOR.secondary,
              opacity: 1,
            },
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(137, 146, 169, 0.2)',
            },
          },

          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: PRIMARY_COLOR.main,
              borderWidth: '1px',
            },
          },

          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(137, 146, 169, 0.2)',
          },
        },
      },
    },
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
    MuiPagination: {
      defaultProps: {
        variant: 'outlined',
        shape: 'rounded',
        color: 'primary',
        size: 'large',
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        rounded: {
          borderRadius: 'unset',
          margin: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
  typography: TypographyComponent(),
})
