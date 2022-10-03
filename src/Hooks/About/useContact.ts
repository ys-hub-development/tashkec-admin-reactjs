import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { Contact } from 'Entities/about'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useContact({ initList, detailId }: Props) {
  return useCRUDApi<Contact[], Contact, any>({
    key: 'contact',
    url: '/api/contact-infos',
    enabled: true,
    initList,
    detailId,
  })
}