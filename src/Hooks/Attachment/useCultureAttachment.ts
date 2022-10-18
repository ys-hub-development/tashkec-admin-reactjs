import { IAttachmentBase } from 'Entities/attachment'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useCultureAttachments({ initList, detailId, extraId }: Props) {
  return useCRUDApi<IAttachmentBase[], IAttachmentBase, any>({
    key: 'cultureAttachment',
    url: '/api/attachments/korean-culture',
    enabled: true,
    initList,
    detailId,
    extraId,
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}
