import { useApiQuery } from 'Hooks/App/useApiQuery'

export function useAccountMe() {
  return useApiQuery({
    url: '/account/me',
    key: 'account',
  })
}