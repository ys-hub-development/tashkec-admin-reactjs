import { createContext } from 'react'
import { InstitutionContextProps } from 'Views/University/types'
import { EducationTypeEnum } from 'Entities/institution'

export const InstitutionContext = createContext<InstitutionContextProps>({
  type: EducationTypeEnum.COLLEGE_AND_LYCEUM
})