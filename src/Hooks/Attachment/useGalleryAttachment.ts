import { IAttachmentBase } from 'Entities/attachment'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useGalleryAttachment ({ initList, detailId, extraId, enabled }: Props) {
  return useCRUDApi<IAttachmentBase[], IAttachmentBase, FormData>({
    key: 'cultureAttachment',
    url: '/api/attachments/photo-gallery',
    enabled: !!enabled,
    initList,
    detailId,
    extraId,
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}
