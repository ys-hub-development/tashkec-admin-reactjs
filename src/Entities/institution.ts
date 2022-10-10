export enum EducationTypeEnum {
  COLLEGE_AND_LYCEUM = 'COLLEGE_AND_LYCEUM',
  KOREAN_UNIVERSITY = 'KOREAN_UNIVERSITY',
  UZBEKISTAN_UNIVERSITY = 'UZBEKISTAN_UNIVERSITY',
  SCHOOL = 'SCHOOL',
}

export interface IInstitution {
  id: number
  titleUz: string
  titleRu: string
  titleKr: string
  contentUz: string
  contentRu: string
  contentKr: string
  logoPath: string
  educationTypeEnum: EducationTypeEnum
}
