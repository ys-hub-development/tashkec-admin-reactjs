import { ReactNode } from 'react'
import { QueryParams } from 'Types/api'
import { AxiosRequestConfig } from 'axios'
import { GridSize } from '@mui/material/Grid/Grid'

export type FormProps = {
  lang: string
}

export type TableColumnType = {
  title: string | ReactNode,
  gridSize?: boolean | GridSize;
}

export interface IParams extends Record<string, string | undefined> {
  userId: string
  historyId: string
  planId: string
}

export type ListHook = {
  infinite?: boolean
  init?: boolean
}

export type DetailHook = {
  detailId?: string
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
}

export type CRUDApi<D> = ApiAction & {
  data: D
  id?: string
}

export type ControllerHookProps = Pick<CrudServiceProps, 'initList' | 'detailId'>

export type LangType = 'Kr' | 'Uz' | 'Ru'

export type LangError = {
  [key in LangType]: boolean
}