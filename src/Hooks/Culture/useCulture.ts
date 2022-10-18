import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { ICulture } from 'Entities/culture'

type Props = ControllerHookProps

export function useCulture({ initList, detailId }: Props) {
  return useCRUDApi<ICulture[], ICulture, Partial<ICulture>>({
    url: '/api/korean-cultures',
    enabled: true,
    initList,
    detailId,
    key: 'culture',
  })
}
