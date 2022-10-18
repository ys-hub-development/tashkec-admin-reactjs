import { createContext } from 'react'
import { CultureContextProps } from 'Views/Culture/types'
import { KoreanCultureType } from 'Entities/culture'

export const CultureContext = createContext<CultureContextProps>({
  type: KoreanCultureType.ADDITIONAL_LESSON
})