import React, { FC, useCallback, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NavItem, NavItemSubs } from '../Atoms'
import cn from 'classnames'
import { AppNavigation } from 'Config'
import { ChevronDownIcon } from 'Icons/Chevron'

type Props = AppNavigation & {
  id: string
  openId: string | null
  setOpenId: (id: string | null) => void
  parentPath?: string
}

export const SidebarMenuItem: FC<Props> = ({ children, title, path, openId, setOpenId, parentPath, id }) => {
  const { pathname } = useLocation()
  const childrenList = useMemo(() => children && children.filter(item => !item.hidden), [ children ])

  const active = useMemo(() => (path === '/' ? path === pathname : pathname.indexOf(path.substring(1)) !== -1), [ path, pathname ])

  const handleClick = useCallback(() => {
    if (id === openId) {
      setOpenId(null)
    } else {
      setOpenId(id)
    }
  }, [ id, openId, setOpenId ])

  return (
    <NavItem className={cn({ child: !!parentPath })}>
      {childrenList && childrenList?.length > 0 ? (
        <div className={cn('nav-title', { active })} onClick={handleClick}>
          <div className='menu-title'>{title}</div>
          <div className='icon-box'>
            <ChevronDownIcon />
          </div>
        </div>
      ) : (
        <NavLink
          onClick={() => window.scroll(0, 0)}
          className={cn({ 'nav-link': true })}
          to={parentPath ? `${parentPath}/${path}` : `/${path}`}
        >
          <div className='menu-title'>{title}</div>
        </NavLink>
      )}
      {childrenList && childrenList.length > 0 && (
        <NavItemSubs className={cn({ show: openId === id })}>
          {childrenList.map((item) => (
            <SidebarMenuItem
              key={item.path}
              {...item}
              id={item.path}
              openId={openId}
              setOpenId={setOpenId}
              path={item.path} parentPath={`/${path}`}
            />
          ))}
        </NavItemSubs>
      )}
    </NavItem>
  )
}
