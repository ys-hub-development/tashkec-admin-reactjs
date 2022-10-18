import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { ITopikLevel } from 'Entities/material'

type Props = ControllerHookProps

export function useTopikLevel({ initList, detailId, extraId }: Props) {
  return useCRUDApi<ITopikLevel[], ITopikLevel, Partial<ITopikLevel>>({
    url: '/api/level-of-topics',
    key: 'levelOfTopik',
    enabled: true,
    initList,
    detailId,
    extraId,
  })
}