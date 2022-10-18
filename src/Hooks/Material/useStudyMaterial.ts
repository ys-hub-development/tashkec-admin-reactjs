import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { IStudyMaterial } from 'Entities/material'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useStudyMaterial({initList, detailId, extraId}: Props) {
  return useCRUDApi<IStudyMaterial[], IStudyMaterial, Partial<IStudyMaterial>>({
    url: '/api/study-materials',
    key: 'studyMaterials',
    initList,
    detailId,
    extraId,
    enabled: true
  })
}