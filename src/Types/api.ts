export type QueryParams = {
  page: number
  size: number
}

export type Response<D> = {
  message: string,
  object:D,
  success: boolean
}