import { useMainPicture } from 'Views/Home/Hooks'

export type MainMediaFile = {
  id: number
  url: string,
  file: File,
  status: boolean
}

export type PictureContextType = ReturnType<typeof useMainPicture>
