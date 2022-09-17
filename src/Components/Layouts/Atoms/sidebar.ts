import { styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const StyledSidebar = styled('aside')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: 'var(--sidebar-width)',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}))

export const LogoLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  height: 'var(--header-height)',
  color: 'var(--logo-color)',
  fontSize: 18,
  lineHeight: '27px',
  fontWeight: 500,
  padding: '16px 24px 0 24px',
  fontFamily: 'var(--secondary-font)',
  justifyContent: 'center',
  textAlign: 'center',

  img: {
    width: '32px',
    height: 'auto',
    marginRight: 8,
  },
}))

export const NavItem = styled('div')(({ theme }) => ({
  padding: '0 8px',

  '&.child': {
    padding: 0,
  },

  '.icon-box': {
    marginLeft: 'auto',
  },

  '.nav-link, .nav-title': {
    display: 'flex',
    padding: '16px 18px',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    textDecoration: 'unset',
    cursor: 'pointer',
    fontSize: 14,
    position: 'relative',
    lineHeight: '16px',
    borderRadius: 'var(--border-radius)',
  },

  '.nav-link': {
    '&.active': {
      color: theme.palette.primary.main,
    },
  },

  '.nav-title': {
    '&.active': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export const NavItemSubs = styled('div')(() => ({
  '.nav-link': {
    padding: '10px 16px 10px 32px !important',
  },

  maxHeight: 0,
  overflow: 'hidden',
  transition: 'all .5s ease-in-out',
  '&.show': {
    maxHeight: '260px',
  },
}))