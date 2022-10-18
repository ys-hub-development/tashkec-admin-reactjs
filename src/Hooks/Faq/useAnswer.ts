import { useCRUDApi } from 'Hooks/App'
import { ControllerHookProps } from 'Types/app'
import { IAnswer } from 'Entities/faq'

type Props = ControllerHookProps

export function useAnswer(p: Props) {
  return useCRUDApi<IAnswer[], IAnswer, Partial<IAnswer>>({
    key: 'answer',
    url: '/api/question-answers',
    enabled: true,
    ...p,
  })
}