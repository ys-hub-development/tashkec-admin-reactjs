import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { CenterStructure } from 'Entities/about'

type Props = ControllerHookProps

export function useCenterStructure({ detailId, initList }: Props) {
  return useCRUDApi<CenterStructure[], CenterStructure, Omit<CenterStructure, 'id'>>({
    key: 'structure',
    url: '/api/center-structures',
    enabled: true,
    initList,
    detailId,
  })
}