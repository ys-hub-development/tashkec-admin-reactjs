import { useMemo } from 'react'
import { StudyPath } from 'Constants/Navigation'
import { APP } from 'Constants/App'
import { StudyTypeEnum } from 'Entities/news'

export function useStudyInKoreaConfig(type: StudyTypeEnum) {

  const subPath = useMemo((): string => {
    switch (type) {
      case StudyTypeEnum.PROGRAM_OF_GKS:
        return StudyPath['program-of-gks']
      case StudyTypeEnum.ASSOCIATION_GKS:
        return StudyPath['association-gks']
      case StudyTypeEnum.NEWS_OF_STUDY:
        return StudyPath['news-of-study']
      case StudyTypeEnum.PROGRAM_FOR_KOR:
        return StudyPath['program-for-kor']
      default:
        return StudyPath['program-of-gks']
    }
  }, [ type ])

  const addTitle = useMemo((): string => {
    switch (type) {
      case StudyTypeEnum.PROGRAM_OF_GKS:
        return APP.ADD_GKS_PROGRAM
      case StudyTypeEnum.ASSOCIATION_GKS:
        return APP.ADD_ASSOC_GKS
      case StudyTypeEnum.NEWS_OF_STUDY:
        return APP.ADD_NEWS
      case StudyTypeEnum.PROGRAM_FOR_KOR:
        return APP.ADD_PROGRAM_FOR_KOR
      default:
        return APP.ADD_GKS_PROGRAM
    }
  }, [ type ])

  const editTitle = useMemo((): string => {
    switch (type) {
      case StudyTypeEnum.PROGRAM_OF_GKS:
        return APP.EDIT_GKS_PROGRAM
      case StudyTypeEnum.ASSOCIATION_GKS:
        return APP.EDIT_ASSOC_GKS
      case StudyTypeEnum.NEWS_OF_STUDY:
        return APP.EDIT_NEWS
      case StudyTypeEnum.PROGRAM_FOR_KOR:
        return APP.EDIT_PROGRAM_FOR_KOR
      default:
        return APP.EDIT_GKS_PROGRAM
    }
  }, [ type ])

  return {
    subPath,
    addTitle,
    editTitle,
  }
}