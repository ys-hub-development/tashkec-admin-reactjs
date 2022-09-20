import { createTheme } from '@mui/material'
import { MuiButtonComponent, TypographyComponent } from 'Theme/Components'
import { ERROR_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from 'Constants/Colors'

export const theme = createTheme({
  palette: {
    primary: PRIMARY_COLOR,
    error: ERROR_COLOR,
    secondary: SECONDARY_COLOR,
    text: TEXT_COLOR,
    background: {
      default: '#fff',
      paper: '#FDFDFD',
    },
  },
  components: {
    MuiButton: MuiButtonComponent(),
    MuiTypography: {
      styleOverrides: {
        root: {
          color: TEXT_COLOR.primary,
        },
      },
    },
  },
  typography: TypographyComponent(),
})
