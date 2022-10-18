import { useMemo } from 'react'
import { CulturePath } from 'Constants/Navigation'
import { KoreanCultureType } from 'Entities/culture'
import { APP } from 'Constants/App'

export function useCultureConfig(type: KoreanCultureType) {

  const subPath = useMemo((): string => {
    switch (type) {
      case KoreanCultureType.INTRODUCE_KOREAN_CULTURE:
        return CulturePath['culture-of-korea']
      case KoreanCultureType.ADDITIONAL_LESSON:
        return CulturePath['creative-mugs']
      default:
        return CulturePath['creative-mugs']
    }
  }, [ type ])

  const addTitle = useMemo((): string => {
    switch (type) {
      case KoreanCultureType.INTRODUCE_KOREAN_CULTURE:
        return APP.ADD_INFO
      case KoreanCultureType.ADDITIONAL_LESSON:
        return APP.ADD_MUG
      default:
        return CulturePath['creative-mugs']
    }
  }, [ type ])

  const editTitle = useMemo((): string => {
    switch (type) {
      case KoreanCultureType.INTRODUCE_KOREAN_CULTURE:
        return CulturePath['culture-of-korea']
      case KoreanCultureType.ADDITIONAL_LESSON:
        return APP.EDIT_MUG
      default:
        return CulturePath['creative-mugs']
    }
  }, [ type ])

  return {
    subPath,
    addTitle,
    editTitle,
  }
}