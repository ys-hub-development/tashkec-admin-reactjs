import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { Greeting } from 'Entities/about'

type Props = ControllerHookProps

export function useGreeting({ detailId, initList }: Props) {
  return useCRUDApi<Greeting[], Greeting, Omit<Greeting, 'id'>>({
    key: 'greeting',
    url: '/api/greetings',
    enabled: true,
    initList,
    detailId,
  })
}