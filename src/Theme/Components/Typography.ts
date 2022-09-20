import { TypographyOptions } from '@mui/material/styles/createTypography'

export const TypographyComponent = (): TypographyOptions => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: 14,

  h1: {
    fontWeight: 600,
    fontSize: 26,
    lineHeight: '32px',
  },

  h2: {
    lineHeight: '29px',
    fontSize: 24,
    fontWeight: 600,
  },

  h3: {
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 20,
  },

  h4: {
    fontWeight: 600,
    lineHeight: '21px',
    fontSize: 18,
  },

  h5: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '17px',
  },

  body1: {
    lineHeight: '25px',
    fontSize: 16,
  },

  body2: {
    fontSize: 14,
    lineHeight: '20px',
  },

  subtitle1: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '20px',
  },

  subtitle2: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '17px',
  },

  caption: {
    fontSize: 12,
    lineHeight: '15px',
  },
})