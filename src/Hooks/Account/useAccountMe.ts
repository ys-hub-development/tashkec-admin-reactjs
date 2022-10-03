import { useStore } from 'effector-react'
import { $AppStore, fetchAccountMe } from 'Models'
import { useEffect } from 'react'

export function useAccountMe() {
  const { isAuthenticated } = useStore($AppStore)
  useEffect(() => {
    if (isAuthenticated) {
      fetchAccountMe()
    }
  }, [ isAuthenticated ])
}