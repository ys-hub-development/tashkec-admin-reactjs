export type PictureAttachment = {
  bucketName: string
  contentType: string
  education: null | string
  fileNameKr: null | string
  fileNameRu: null | string
  fileNameUz: null | string
  fileSize: number
  fileTypeEnum: string
  id: number
  levelOfTopic: null | string
  originalFileName: string
  path: string
  photogallery: null | string
  studyInKorea: null | string
  studyMaterial: null | string
  suffix: string
  thumbnailFileName: string
  uniqueFileName: null | string
}

export type Banner = {
  attachment: PictureAttachment
  id: number
  name: string | null
  sliderUrl: string | null
}

export type Logo = {
  contentType: string
  education: string | null
  fileNameKr: null | string
  fileNameRu: null | string
  fileNameUz: null | string
  fileSize: number
  fileTypeEnum: string
  id: number
  levelOfTopic: null | string
  objectName: null | string
  originalFileName: string
  path: string
  photogallery: null | string
  studyInKorea: null | string
  studyMaterial: null | string
  thumbnailFilePath: null | string
}

export type Popup = {
  id: number,
  isImage: boolean,
  videoUrl: string | null,
  redirectUrl: string | null,
  attachment: PictureAttachment | null
}