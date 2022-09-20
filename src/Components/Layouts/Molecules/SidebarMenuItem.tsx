import React, { FC, Fragment, useCallback, useMemo } from 'react'
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
  const hasChildren = useMemo(() => children, [ children ])

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
      {hasChildren ? (
        <div className={cn('nav-title', { active })} onClick={handleClick}>
          <div className='menu-title'>{title}</div>
          <div className='icon-box'>
            <ChevronDownIcon />
          </div>
        </div>
      ) : (
        <NavLink className={cn({ 'nav-link': true })} to={parentPath ? `${parentPath}/${path}` : `/${path}`}>
          <div className='menu-title'>{title}</div>
        </NavLink>
      )}
      {!!children && (
        <NavItemSubs className={cn({ show: openId === id })}>
          {children.map((item, idx) => (
            <Fragment key={`${idx + 1}`}>
              {!item.hidden ? (
                <SidebarMenuItem
                  {...item}
                  id={item.path}
                  openId={openId}
                  setOpenId={setOpenId}
                  path={item.path} parentPath={`/${path}`}
                />
              ) : null}
            </Fragment>
          ))}
        </NavItemSubs>
      )}
    </NavItem>
  )
}
