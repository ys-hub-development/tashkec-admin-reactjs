import { Components } from '@mui/material'
import { ERROR_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from 'Constants/Colors'

export const MuiButtonComponent = (): Components['MuiButton'] => ({
  defaultProps: {
    disableRipple: true,
    disableElevation: true,
    variant: 'contained',
    size: 'medium',
  },
  styleOverrides: {
    root: {
      textTransform: 'unset',
      fontSize: 14,
      lineHeight: '17px',
      borderRadius: 10,

      svg: {
        width: 20,
        height: 20
      },

      '&.Mui-disabled': {
        cursor: 'not-allowed',
      },
    },
    sizeLarge: {
      padding: '15px 22px',
      lineHeight: '18px',
    },
    sizeMedium: {
      padding: '14px 22px',
    },
    containedSecondary: {
      '&.light': {
        backgroundColor: SECONDARY_COLOR.light,
        color: SECONDARY_COLOR.main,
      },

      '&.light:hover': {
        backgroundColor: SECONDARY_COLOR.main,
        color: SECONDARY_COLOR.contrastText,
      },

      '&.Mui-disabled': {
        backgroundColor: TEXT_COLOR.disabled,
        color: TEXT_COLOR.secondary,
      },
    },
    containedPrimary: {
      '&.light': {
        backgroundColor: PRIMARY_COLOR.light,
        color: PRIMARY_COLOR.main,
      },

      '&.light:hover': {
        backgroundColor: PRIMARY_COLOR.main,
        color: PRIMARY_COLOR.contrastText,
      },

      '&.Mui-disabled': {
        backgroundColor: TEXT_COLOR.disabled,
        color: TEXT_COLOR.secondary,
      },
    },
    outlinedPrimary: {
      '&.filled': {
        backgroundColor: PRIMARY_COLOR.light,
        color: PRIMARY_COLOR.main,
      },

      '&.Mui-disabled': {
        color: TEXT_COLOR.secondary,
        borderColor: TEXT_COLOR.secondary,
      },
    },
    containedError: {
      '&.light': {
        backgroundColor: ERROR_COLOR.light,
        color: ERROR_COLOR.main,
      },

      '&.light:hover': {
        backgroundColor: ERROR_COLOR.main,
        color: ERROR_COLOR.contrastText,
      },

      '&.Mui-disabled': {
        backgroundColor: TEXT_COLOR.disabled,
        color: TEXT_COLOR.secondary,
      },
    },
    outlinedSecondary: {
      '&.filled': {
        backgroundColor: SECONDARY_COLOR.light,
        color: SECONDARY_COLOR.main,
      },

      '&.Mui-disabled': {
        color: TEXT_COLOR.secondary,
        borderColor: TEXT_COLOR.secondary,
      },
    },
    outlinedError: {
      '&.filled': {
        backgroundColor: ERROR_COLOR.light,
        color: ERROR_COLOR.main,
      },

      '&.Mui-disabled': {
        color: TEXT_COLOR.secondary,
        borderColor: TEXT_COLOR.secondary,
      },
    },
  },
})