export type QueryParams = {
  page: number
  size: number
  educationTypeEnum?: string
  studyTypeEnum?: string
  koreanCultureType?: string
  searchValue?: string
}

export type Response<D> = {
  message: string,
  object: D,
  success: boolean
}

export type ApiResponseHeader = {
  'x-total-count': string
}