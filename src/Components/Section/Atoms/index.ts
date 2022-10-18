import { styled } from '@mui/material'

export const LangFilterItem = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f7f7',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  padding: 14,
  lineHeight: '25px',
  fontSize: 16,
  borderRadius: 10,

  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}))
