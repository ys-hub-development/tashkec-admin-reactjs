import { ReactNode } from 'react'
import { QueryParams } from 'Types/api'
import { AxiosRequestConfig } from 'axios'
import { GridSize } from '@mui/material/Grid/Grid'

export type TableColumnType = {
  title: string | ReactNode
  gridSize?: boolean | GridSize
}

export interface IParams extends Record<string, string | undefined> {
  userId: string
  historyId: string
  planId: string
  eventId: string
  newsId: string
  studyId: string
  institutionId: string
  studyMaterialId: string
  topikLevelId: string
  answerId: string
  cultureId: string
  galleryId: string
}

export type ApiActionParamType = { [key: string]: any }

export type ApiAction = {
  action?: (fields?: ApiActionParamType) => void
}

export type CrudServiceProps = {
  key: string
  url: string
  initList: boolean
  useDefaultQuery?: boolean
  params?: QueryParams
  enabled: boolean
  detailId?: string
  axiosParam?: AxiosRequestConfig
  extraId?: string
}

export type CRUDApi<D> = ApiAction & {
  data: D
  id?: string,
  noMessage?: boolean
}

export type ControllerHookProps = Pick<CrudServiceProps, 'initList' | 'detailId' | 'extraId'> & {
  enabled?: boolean
}

export type LangType = 'Kr' | 'Uz' | 'Ru'

export type LangError = {
  [key in LangType]: boolean
}

export interface IAutoCompleteOption {
  label: string
  value: string | number
}
