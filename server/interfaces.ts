export interface IComic {
  name: string,
  description: string,
  subdomain: string,
  visibility: string,
  author: number
}

export interface ITableNameIDPair {
  [key:string]: string
}

export interface IComicPage {
  img: string,
  comicId: number,
  id?: number,
  pageNumber?: number,
  chapterId?: number,
  createdAt?: number,
}

export interface ITranslationTable {
  [key:string]: string
}