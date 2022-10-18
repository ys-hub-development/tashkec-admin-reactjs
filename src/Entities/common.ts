export interface ITitle {
  id: number
  titleUz: string,
  titleRu: string,
  titleKr: string,
}

export interface IContent {
  id: number
  contentUz: string,
  contentRu: string,
  contentKr: string
}

export interface IFullContent extends Omit<ITitle, 'id'>, IContent {

}