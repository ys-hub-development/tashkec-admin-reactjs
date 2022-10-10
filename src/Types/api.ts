export type QueryParams = {
  page: number
  size: number
  educationTypeEnum?: string
}

export type Response<D> = {
  message: string,
  object:D,
  success: boolean
}