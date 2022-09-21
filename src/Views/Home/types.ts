import { useMainPicture } from 'Views/Home/Hooks'

export type MainMediaFile = {
  id: number
  url: string,
  file: File
}

export type PictureContextType = ReturnType<typeof useMainPicture>