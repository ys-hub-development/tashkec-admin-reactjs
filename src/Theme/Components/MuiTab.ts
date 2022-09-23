import { Components } from '@mui/material'

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
    },
  },
})