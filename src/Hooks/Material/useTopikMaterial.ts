import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { ITopikMaterial } from 'Entities/material'

type Props = ControllerHookProps

export function useTopikMaterial({detailId, initList, extraId}:Props) {
  return useCRUDApi<ITopikMaterial[], ITopikMaterial, Partial<ITopikMaterial>>({
    url: '/api/materials-of-topics',
    detailId,
    initList,
    extraId,
    enabled: true,
    key: 'materialsOfTopik'
  })
}