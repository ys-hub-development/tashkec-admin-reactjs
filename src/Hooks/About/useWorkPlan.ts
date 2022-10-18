import { useCRUDApi } from 'Hooks/App/useApiCrud'
import { ControllerHookProps } from 'Types/app'
import { WorkPlan } from 'Entities/about'

type Props = ControllerHookProps

export function useWorkPlan({ initList, detailId }: Props) {
  return useCRUDApi<WorkPlan[], WorkPlan, Partial<WorkPlan>>({
    key: 'plan',
    url: '/api/work-plans',
    enabled: true,
    initList,
    detailId,
  })
}
