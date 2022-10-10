import { IAttachment } from 'Entities/attachment'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useAttachments({ initList, detailId }: Props) {
  return useCRUDApi<IAttachment[], IAttachment, Partial<IAttachment>>({
    key: 'studyInKoreaAttachment',
    url: '/api/attachments',
    enabled: true,
    initList,
    detailId,
  })
}
