import { createContext } from 'react'
import { StudyInKoreaContextProps } from 'Views/StudyInKorea/types'
import { StudyTypeEnum } from 'Entities/news'

export const StudyInKoreaContext = createContext<StudyInKoreaContextProps>({
  type: StudyTypeEnum.ASSOCIATION_GKS,
})