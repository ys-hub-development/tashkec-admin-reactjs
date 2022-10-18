import { IFullContent } from 'Entities/common'

export enum KoreanCultureType {
  ADDITIONAL_LESSON = 'ADDITIONAL_LESSON', INTRODUCE_KOREAN_CULTURE = 'INTRODUCE_KOREAN_CULTURE'
}

export interface ICulture extends IFullContent {
  koreanCultureType: KoreanCultureType
}