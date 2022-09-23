import { ReactElement, ReactNode } from 'react'
import { DialogProps, DrawerProps, SnackbarProps } from '@mui/material'

export type AppStore = {
  isAuthenticated: boolean
}

type TMessageType = 'success' | 'error' | 'info' | 'warning'

export type Message = {
  type: TMessageType
  content?: string
  reactNode?: ReactElement<any, any>
  props?: SnackbarProps
}

export type Dialog = {
  open: boolean
  title?: string
  content: string | ReactNode | null
  agreeAction?: () => void
  props?: DialogProps
}

export type Drawer =  {
  children: ReactNode
  props: DrawerProps
  customClose?: () => void
  width: string | number
}

export interface AppUI {
  message: Message | null
  dialog: Dialog | null
  drawer: Drawer | null
}
