import { AccountCircleIcon } from 'Icons'
import { ChevronDownIcon } from 'Icons/Chevron'
import { HeaderProfile } from 'Components/Layouts/Atoms'
import { MouseEvent, useState } from 'react'
import { Menu, MenuItem, Typography } from '@mui/material'
import { APP } from 'Constants/App'
import { getAppAuthStatus } from 'Models'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { queryClient } from 'index'

export const ProfileMenu = () => {
  const navigate = useNavigate()
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (exit?: boolean) => {
    if (exit) {
      queryClient.clear()
      navigate('/sign-in')
      Cookies.remove('token')
      getAppAuthStatus(false)
    } else {
      navigate('/profile')
    }
  }

  return (
    <>
      <HeaderProfile
        spacing={1}
        direction='row'
        id='profile-menu'
        alignItems='center'
        justifyContent='center'
        onClick={handleClick}
      >
        <AccountCircleIcon /><span>Профиль</span><ChevronDownIcon />
      </HeaderProfile>
      <Menu
        open={open}
        id='profile-menu'
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ className: 'box-shadow' }}
        MenuListProps={{ 'aria-labelledby': 'profile-menu' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleClose()}>{APP.MY_PROFILE}</MenuItem>
        <MenuItem onClick={() => handleClose(true)}>
          <Typography variant='body2' color='secondary.main'>{APP.EXIT}</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
