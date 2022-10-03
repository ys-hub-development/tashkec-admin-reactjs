import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { Popup } from 'Entities/main'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function usePopup({detailId, initList}: Props) {
  return useCRUDApi<Popup[], Popup, any>({
    key: 'popup',
    url: '/api/popups',
    detailId,
    initList,
    enabled: true,
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}