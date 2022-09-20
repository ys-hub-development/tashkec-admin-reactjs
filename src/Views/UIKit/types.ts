import { ButtonProps } from '@mui/material'
import { ReactNode } from 'react'

export type ButtonKitType = {
  variant: ButtonProps['variant']
  size: ButtonProps['size'][]
  heading: string
  title: string
  icon?: ReactNode
}
