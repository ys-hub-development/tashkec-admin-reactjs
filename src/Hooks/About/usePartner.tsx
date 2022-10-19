import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { IPartner } from 'Entities/about'

type Props = ControllerHookProps

export function usePartner({ initList, detailId }: Props) {
  return useCRUDApi<IPartner[], IPartner, Partial<IPartner>>({
    key: 'partner',
    url: '/api/partners',
    enabled: true,
    initList,
    detailId,
  })
}