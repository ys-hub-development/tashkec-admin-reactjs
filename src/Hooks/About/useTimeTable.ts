import { ITimeTable } from 'Entities/about'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useTimeTable({ detailId, initList }: Props) {
  return useCRUDApi<ITimeTable[], ITimeTable, Partial<ITimeTable>>({
    key: 'timeTable',
    url: '/api/time-tables',
    enabled: true,
    initList,
    detailId,
  })
}
