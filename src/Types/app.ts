import { ReactNode } from 'react'

export type FormProps = {
  lang: string
}

export type TableColumnType<D> = {
  title: string,
  render:(item: D) => ReactNode
}