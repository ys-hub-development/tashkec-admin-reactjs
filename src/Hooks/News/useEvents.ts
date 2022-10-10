import { IEvents } from 'Entities/news'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useEvents({ detailId, initList }: Props) {
  return useCRUDApi<IEvents[], IEvents, Partial<IEvents>>({
    key: 'news',
    url: '/api/news',
    enabled: true,
    detailId,
    initList,
  })
}
