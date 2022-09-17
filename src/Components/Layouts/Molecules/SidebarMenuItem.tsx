import React, { FC, Fragment, useCallback, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NavItem, NavItemSubs } from '../Atoms'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { AppNavigation } from 'Config'
import { ChevronDownIcon } from 'Icons/Chevron'

type Props = AppNavigation & {
  openId: string | null
  setOpenId: (id: string | null) => void,
  isChild?: boolean
}

export const SidebarMenuItem: FC<Props> = (
  {
    children,
    title,
    path,
    openId,
    setOpenId,
    isChild
  },
) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const hasChildren = useMemo(() => children, [ children ])

  const active = useMemo(() => path === '/'
    ? path === pathname
    : pathname.indexOf(path.substring(1)) !== -1, [ path, pathname ])

  const handleClick = useCallback(() => {
    if (title === openId) {
      setOpenId(null)
    } else {
      setOpenId(title)
    }
  }, [ openId, setOpenId, title ])

  return (
    <NavItem className={cn({ child: !!isChild })}>
      {
        hasChildren
          ? (
            <div className={cn('nav-title', { active })} onClick={handleClick}>
              <div className='menu-title'>
                {t(title)}
              </div>
              <div className='icon-box'>
                <ChevronDownIcon />
              </div>
            </div>
          )
          : (
            <NavLink
              className={cn({ 'nav-link': true })}
              to={path}
            >
              <div className='menu-title'>
                {t(title)}
              </div>
            </NavLink>
          )
      }
      {
        !!children && (
          <NavItemSubs className={cn({ show: openId === title })}>
            {
              children.map((item, idx) => (
                <Fragment key={`${idx + 1}`}>
                  {
                    !item.hidden
                      ? (
                        <SidebarMenuItem
                          {...item}
                          openId={openId}
                          setOpenId={setOpenId}
                          path={item.path}
                          isChild={true}
                        />
                      )
                      : null
                  }
                </Fragment>
              ))
            }
          </NavItemSubs>
        )
      }
    </NavItem>
  )
}