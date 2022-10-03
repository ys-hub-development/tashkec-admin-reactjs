import { createContext } from 'react'
import { PictureContextType } from '../types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): any {}

export const PictureContext = createContext<PictureContextType>({
  files: [],
  type: 'banner',
  isCreateIsLoading: false,
  onSave: noop,
  onChange: noop,
  onRemove: noop,
  getLogoLoading: noop,
  onRemoveLocalFile: noop,
  getBannerRemoveLoading: noop,
})