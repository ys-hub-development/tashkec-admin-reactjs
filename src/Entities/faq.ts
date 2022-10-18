import { IFullContent } from 'Entities/common'

export interface IAnswer extends IFullContent {
  ordering: 0
}

export interface IFeedback {
  id: number,
  fullName: string,
  phoneNumber: string,
  content: string,
}