import { TypographyOptions } from '@mui/material/styles/createTypography'
import { TEXT_COLOR } from 'Constants/Colors'

export const TypographyComponent = (): TypographyOptions => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: 14,

  h1: {
    fontWeight: 600,
    fontSize: 26,
    lineHeight: '32px',
    color: TEXT_COLOR.primary,
  },

  h2: {
    lineHeight: '29px',
    fontSize: 24,
    fontWeight: 600,
    color: TEXT_COLOR.primary,
  },

  h3: {
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 20,
    color: TEXT_COLOR.primary,
  },

  h4: {
    fontWeight: 600,
    lineHeight: '21px',
    fontSize: 18,
    color: TEXT_COLOR.primary,
  },

  h5: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '17px',
    color: TEXT_COLOR.primary,
  },

  body1: {
    lineHeight: '25px',
    fontSize: 16,
    color: TEXT_COLOR.primary,
  },

  body2: {
    fontSize: 14,
    lineHeight: '20px',
    color: TEXT_COLOR.secondary,
  },

  subtitle1: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '20px',
    color: TEXT_COLOR.primary,
  },

  subtitle2: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '17px',
    color: TEXT_COLOR.primary,
  },

  caption: {
    fontSize: 12,
    lineHeight: '15px',
    color: TEXT_COLOR.secondary,
  },
})