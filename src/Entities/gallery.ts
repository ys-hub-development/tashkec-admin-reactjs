import { ITitle } from 'Entities/common'

export interface IGallery extends ITitle {
  publishedDate: string
  mainPhotoUrl: string | null
}

export type MainPhotoMutation = {
  data: { photoGalleryId: number; attachmentId: number }
  action?: () => void
}
