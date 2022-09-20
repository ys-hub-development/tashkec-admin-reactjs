import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { appNavigation } from 'Config'

export const HeaderHeading = () => {
  const { pathname } = useLocation()

  const title: string = useMemo(() => {
    const arr: string[] = pathname.split('/')
    if (arr.length > 0) {
      console.log(arr)
      return appNavigation.find(item => item.path === arr[1])?.title || ''
    }
    return ''
  }, [pathname])

  return <Typography variant='h2'>{title}</Typography>
}
