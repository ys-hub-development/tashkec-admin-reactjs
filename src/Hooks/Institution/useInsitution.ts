import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { IInstitution } from 'Entities/institution'

type Props = ControllerHookProps

export function useInstitution({ initList, detailId }: Props) {
  return useCRUDApi<IInstitution[], IInstitution, Partial<IInstitution>>({
    url: '/api/educations',
    enabled: true,
    initList,
    detailId,
    key: 'institution',
  })
}
