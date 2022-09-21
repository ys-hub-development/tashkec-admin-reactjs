import { FormLabel, styled } from '@mui/material'

export const InputWrapper = styled('div')(() => ({
  position: 'relative',
}))

export const Label = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,

  '.MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}))

export const EndAdornmentWrapper = styled('div')(({theme}) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 12px',
  color: theme.palette.text.secondary
}))

export const InputHelperText = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 14,
  lineHeight: '22px',
  fontSize: 13,
  visibility: 'hidden',
  color: theme.palette.text.secondary,
  zIndex: -1,
  transform: 'translateY(-70%)',
  transition: 'opacity 300ms ease-out, transform 230ms ease-out',
  opacity: 0,

  [theme.breakpoints.down('sm')]: {
    lineHeight: 1.15,
  },

  '&.show': {
    visibility: 'visible',
    transform: 'translateY(0)',
    opacity: 1,
    zIndex: 3,
  },

  '&.error': {
    color: theme.palette.error.main,
  },
}))