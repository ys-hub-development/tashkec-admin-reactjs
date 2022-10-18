import { useCRUDApi } from 'Hooks/App'
import { ControllerHookProps } from 'Types/app'

type Props = ControllerHookProps

export function useQuestion(p: Props) {
  return useCRUDApi({
    key: 'question',
    url: '/api/feedbacks',
    enabled: true,
    ...p
  })
}