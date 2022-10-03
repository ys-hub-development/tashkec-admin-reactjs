import { Components } from '@mui/material'
import { ERROR_COLOR } from 'Constants/Colors'

export const MuiTabComponent = (): Components['MuiTab'] => ({
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      textTransform: 'unset',
      padding: 10,
      lineHeight: '26px',
      minHeight: 'unset',
      fontSize: 16,
      fontWeight: 700,

      '&.error': {
        color: ERROR_COLOR.main
      }
    },
  },
})