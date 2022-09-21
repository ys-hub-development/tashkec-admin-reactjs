import { styled } from '@mui/material'

export const DropzoneWrapper = styled('div')(({ theme }) => ({
  borderRadius: 'var(--border-radius)',
  backgroundColor: '#F4F5F7',
  color: '#8992A9',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  cursor: 'pointer',

  '&.isDragActive': {
    backgroundColor: theme.palette.primary.light,
  },
}))