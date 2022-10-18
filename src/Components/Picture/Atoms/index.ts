import { Stack, styled } from '@mui/material'

export const PictureBox = styled(Stack)(({ theme }) => ({
  '&.uploading': {
    '.img-box': {
      opacity: 0.5,
    },
  },

  '.img-box': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    '&.hovered::before, &.active::before': {
      content: '""',
      width: '100%',
      height: '100%',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      transition: '.2s ease',
      backgroundColor: 'rgba(0,0,0, .3)',
    },

    '&.hovered::before': {
      opacity: 0,
    },

    '&:hover': {
      '.hover-action, &.hovered::before': {
        opacity: 1,
      },
    },

    '.hover-action, .active-title': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transition: '.2s ease',
    },

    '.active-title': {
      color: '#fff',
      textAlign: 'center',
    },

    '.hover-action': {
      opacity: 0,
    },
  },

  '&.banner': {
    '&.gallery': {
      '.img-box': {
        height: 160,
      },
    },

    '.img-box': {
      overflow: 'hidden',
      borderRadius: 18,
      height: 200,
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
      height: 80,
      width: 'auto',
      objectFit: 'contain',
    },
  },
}))
