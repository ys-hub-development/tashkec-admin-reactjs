import { Divider, Stack } from '@mui/material'
import { SidebarMenu, StyledSidebar } from '../Atoms'
import { Logo, SidebarMenuItem } from '../Molecules'
import { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { appAdminNavigation, appPublicNavigation } from 'Config'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const [ openId, setOpenId ] = useState<string | null>(null)

  useEffect(() => {
    const pathArr = pathname.substring(1).split('/')
    if (pathArr.length > 1) {
      setOpenId(pathArr[0])
    } else {
      setOpenId(null)
    }
  }, [ pathname ])

  return (
    <StyledSidebar>
      <Stack spacing={3} paddingBottom={3}>
        <Logo />
        <SidebarMenu>
          {
            appPublicNavigation.map((item, idx) => (
              <Fragment key={`${idx + 1}`}>
                {
                  !item.hidden
                    ? <SidebarMenuItem {...item} id={item.path} openId={openId} setOpenId={setOpenId} />
                    : null
                }
              </Fragment>
            ))
          }
          <Divider />
          {
            appAdminNavigation.map((item, idx) => (
              <Fragment key={`${idx + 1}`}>
                {
                  !item.hidden
                    ? <SidebarMenuItem {...item} id={item.path} openId={openId} setOpenId={setOpenId} />
                    : null
                }
              </Fragment>
            ))
          }
        </SidebarMenu>
      </Stack>
    </StyledSidebar>
  )
}
