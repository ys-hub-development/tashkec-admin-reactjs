import { createContext } from 'react'
import { PictureContextType } from '../types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): any {}

export const PictureContext = createContext<PictureContextType>({
  files: [],
  type: 'banner',
  onChange: noop,
  onRemove: noop,
  onRemoveLocalFile: noop,
})