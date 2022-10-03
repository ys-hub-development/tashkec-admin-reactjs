export type Greeting = {
  id: number,
  titleUz: string,
  titleRu: string,
  titleKr: string,
  contentUz: string,
  contentRu: string,
  contentKr: string
}

export type CenterStructure = Greeting

export type CenterHistory = {
  id: number,
  titleUz: string,
  titleRu: string,
  titleKr: string,
  publishedDate: string
}

export enum WorkPlanTypeEnum {
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export type WorkPlan = Greeting & {
  workPlanTypeEnum: WorkPlanTypeEnum,
}

export type Contact = Greeting & {
  phoneNumber: string,
  contactEmail: string
}