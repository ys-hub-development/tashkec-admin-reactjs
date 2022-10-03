import { ControllerHookProps } from 'Types/app'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { UserBasic } from 'Entities/account'

type Props = ControllerHookProps

export function useUser({ initList, detailId }: Props) {
  return useCRUDApi<UserBasic[], UserBasic, any>({
    key: 'user',
    url: '/admin/users',
    enabled: true,
    initList,
    detailId,
  })
}