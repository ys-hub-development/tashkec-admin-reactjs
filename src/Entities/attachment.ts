export enum FileTypeEnum {
  ZIP = 'ZIP',
  PDF = 'PDF',
  MP3 = 'MP3',
}

export interface IAttachmentBase {
  id: number
  path: string
  originalFileName: string
  thumbnailFilePath: string
  fileNameUz: string
  fileNameRu: string
  fileNameKr: string
  fileTypeEnum: FileTypeEnum | null
}

export interface IAttachment extends IAttachmentBase {
  contentType: string
  education: null | string
  fileSize: number
  levelOfTopic: null | string
  objectName: string
  photogallery: null
  studyInKorea: null
  studyMaterial: null
}
