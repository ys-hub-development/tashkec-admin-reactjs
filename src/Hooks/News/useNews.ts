import { INews } from 'Entities/news'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useNews({ detailId, initList }: Props) {
  return useCRUDApi<INews[], INews, Partial<INews>>({
    key: 'news',
    url: '/api/news',
    enabled: true,
    detailId,
    initList,
  })
}
