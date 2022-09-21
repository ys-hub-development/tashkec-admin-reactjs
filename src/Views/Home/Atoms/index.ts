import { Stack, styled } from '@mui/material'

export const PictureBox = styled(Stack)(({ theme }) => ({

  '.img-box': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


  '&.banner': {
    '.img-box': {
      height: 200
    },

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--border-radius)',
    },
  },

  '&.logo': {
    '.img-box': {
      height: 180,
      borderRadius: 18,
      border: `1px solid ${theme.palette.text.secondary}`,
    },

    img: {
      height: 46,
      width: 'auto',
      objectFit: 'contain',
    },
  },

}))