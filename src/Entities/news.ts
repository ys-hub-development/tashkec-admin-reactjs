export interface INews {
  id: number
  titleKr: string
  titleUz: string
  titleRu: string
  contentKr: string
  contentRu: string
  contentUz: string
  publishedDate: string
}

export interface IEvents extends INews {}

export interface IStudyInKorea extends Omit<INews, 'publishedDate'> {}
