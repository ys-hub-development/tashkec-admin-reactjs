import { IFullContent } from 'Entities/common'

export interface INews extends IFullContent {
  publishedDate: string
}

export type IEvents = INews

export enum StudyTypeEnum {
  PROGRAM_OF_GKS = 'PROGRAM_OF_GKS',
  ASSOCIATION_GKS = 'ASSOCIATION_GKS',
  NEWS_OF_STUDY = 'NEWS_OF_STUDY',
  PROGRAM_FOR_KOR = 'PROGRAM_FOR_KOR'
}

export interface IStudyInKorea extends Omit<INews, 'publishedDate'> {
  studyTypeEnum: StudyTypeEnum
}
