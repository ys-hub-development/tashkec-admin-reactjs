import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { appNavigation } from 'Config'

type LayoutHeadingType = {
  headerHeading: string,
  contentHeading: string
}

export function useLayoutHeading() {
  const { pathname } = useLocation()

  return useMemo((): LayoutHeadingType => {
    const arr: string[] = pathname.split('/')
    if (arr.length > 0) {
      if (arr.length === 2) {
        return {
          headerHeading: appNavigation.find(item => item.path === arr[1])?.title || '',
          contentHeading: appNavigation.find(item => item.path === arr[1])?.title || '',
        }
      } else {
        const parent = appNavigation.find(item => item.path === arr[1])
        return {
          headerHeading: parent?.title || '',
          contentHeading: parent?.children?.find(item => item.path === arr[2])?.title || '',
        }
      }
    }
    return {
      headerHeading: '',
      contentHeading: '',
    }
  }, [ pathname ])
}