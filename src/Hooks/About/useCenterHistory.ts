import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { CenterHistory } from 'Entities/about'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useCenterHistory({ initList, detailId }: Props) {
  return useCRUDApi<CenterHistory[], CenterHistory, Partial<CenterHistory>>({
    key: 'history',
    url: '/api/our-histories',
    enabled: true,
    initList,
    detailId,
  })
}
