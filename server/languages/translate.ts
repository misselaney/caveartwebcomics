import english from './english'
import caveman from './caveman'

const translator = {
  translate: function (phrase: string) {
    return english[phrase] || `Translation missing: ${phrase}`
  }
}

export default translator