import { PictureAttachment } from 'Entities/main'

export type Greeting = {
  id: number
  titleUz: string
  titleRu: string
  titleKr: string
  contentUz: string
  contentRu: string
  contentKr: string
}

export type CenterStructure = Greeting

export type CenterHistory = {
  id: number
  titleUz: string
  titleRu: string
  titleKr: string
  publishedDate: string
}

export enum WorkPlanTypeEnum {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export type WorkPlan = Greeting & {
  workPlanTypeEnum: WorkPlanTypeEnum
}

export type Contact = Greeting & {
  phoneNumber: string
  contactEmail: string
}

export interface ITimeTable {
  id: number
  titleUz: string
  titleRu: string
  titleKr: string
  contentUz: string
  contentRu: string
  contentKr: string
  publishedDate: string
}

export interface IPartner {
  attachmentId?: number
  id: 0,
  titleUz: string,
  titleRu: string,
  titleKr: string,
  webUrl: string,
  youtubeUrl: string,
  attachment: PictureAttachment
}
