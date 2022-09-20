import { styled } from '@mui/material'
import InputUnstyled from '@mui/base/InputUnstyled'

export const StyledInputElement = styled('input')(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  border: '1px solid rgba(137, 146, 169, 0.2)',
  fontSize: 14,
  color: theme.palette.text.primary,
  lineHeight: '20px',
  borderRadius: '10px',
  appearance: 'none',
  backgroundColor: theme.palette.background.paper,
  padding: '13px 16px',
  display: 'block',
  outline: 'none',
  margin: '0',

  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}))

export const InputRoot = styled(InputUnstyled)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  '&.Mui-focused .MuiInput-input': {
    borderColor: theme.palette.primary.main,
    outlineOffset: 'none',
  },

  '&.Mui-error .MuiInput-input': {
    borderColor: theme.palette.error.main,
  },
}))