import { styled } from '@mui/material'

export const PartnerImageBox = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 150,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 10,

  img: {
    height: '60%',
    width: 'auto',
    objectFit: 'contain',
  },
}))