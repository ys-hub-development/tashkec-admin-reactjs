import { IStudyInKorea } from 'Entities/news'
import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useStudyInKorea({ initList, detailId }: Props) {
  return useCRUDApi<IStudyInKorea[], IStudyInKorea, Partial<IStudyInKorea>>({
    url: '/api/study-in-koreas',
    enabled: true,
    initList,
    detailId,
    key: 'studyinKorea',
  })
}
