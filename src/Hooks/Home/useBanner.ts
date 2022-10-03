import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { Banner } from 'Entities/main'

type Props = ControllerHookProps

export function useBanner({ initList, detailId }: Props) {
  return useCRUDApi<Banner[], Banner, any>({
    initList,
    detailId,
    key: 'banner',
    enabled: true,
    url: '/api/sliders',
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}