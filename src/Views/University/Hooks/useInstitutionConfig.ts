import { EducationTypeEnum } from 'Entities/institution'
import { useMemo } from 'react'
import { InstitutionPath } from 'Constants/Navigation'
import { APP } from 'Constants/App'

export function useInstitutionConfig(type: EducationTypeEnum) {

  const subPath = useMemo((): string => {
    switch (type) {
      case EducationTypeEnum.COLLEGE_AND_LYCEUM:
        return InstitutionPath['college-lyceum']
      case EducationTypeEnum.KOREAN_UNIVERSITY:
        return InstitutionPath['korean-university']
      case EducationTypeEnum.UZBEKISTAN_UNIVERSITY:
        return InstitutionPath['uzbekistan-university']
      case EducationTypeEnum.SCHOOL:
        return InstitutionPath.school
      default:
        return InstitutionPath['college-lyceum']
    }
  }, [ type ])

  const addTitle = useMemo((): string => {
    switch (type) {
      case EducationTypeEnum.COLLEGE_AND_LYCEUM:
        return APP.ADD_COLLEGE_LYCEUM
      case EducationTypeEnum.KOREAN_UNIVERSITY:
        return APP.ADD_KOREAN_UNIVERSITY
      case EducationTypeEnum.UZBEKISTAN_UNIVERSITY:
        return APP.ADD_UZBEKISTAN_UNIVERSITY
      case EducationTypeEnum.SCHOOL:
        return APP.ADD_SCHOOL
      default:
        return APP.ADD_COLLEGE_LYCEUM
    }
  }, [ type ])

  const editTitle = useMemo((): string => {
    switch (type) {
      case EducationTypeEnum.COLLEGE_AND_LYCEUM:
        return APP.EDIT_COLLEGE_LYCEUM
      case EducationTypeEnum.KOREAN_UNIVERSITY:
        return APP.EDIT_KOREAN_UNIVERSITY
      case EducationTypeEnum.UZBEKISTAN_UNIVERSITY:
        return APP.EDIT_UZBEKISTAN_UNIVERSITY
      case EducationTypeEnum.SCHOOL:
        return APP.EDIT_SCHOOL
      default:
        return APP.EDIT_COLLEGE_LYCEUM
    }
  }, [ type ])

  return {
    subPath,
    addTitle,
    editTitle
  }
}