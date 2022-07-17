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