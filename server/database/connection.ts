import pgConfig from '../configs/pgconfig'
import { Pool } from 'pg'

export class PoolConnection {
  // @ts-ignore: get fucked typescript
  static instance

  constructor () {
    return new Pool(pgConfig)
  }

  static get() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new PoolConnection()
    return this.instance
  }
}

export default PoolConnection