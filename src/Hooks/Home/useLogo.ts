import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { Logo } from 'Entities/main'

type Props = ControllerHookProps

export function useLogo({ initList, detailId }: Props) {
  return useCRUDApi<Logo[], Logo, any>({
    key: 'logo',
    url: '/api/logos',
    initList,
    detailId,
    enabled: true,
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}