import { IAttachmentBase } from 'Entities/attachment'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useStudyMaterialAttachment({ initList, detailId, extraId }: Props) {
  return useCRUDApi<IAttachmentBase[], IAttachmentBase, any>({
    key: 'UniversityAttachment',
    url: '/api/attachments/study-material',
    enabled: true,
    initList,
    detailId,
    extraId,
    axiosParam: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
}
