import { ITranslationTable } from '../interfaces'

const english = {
  createNewUserError: 'An error occurred creating a new user.',
  noSuchUser: 'No such user with this login information.',
  errorUpdatingSession: 'There was an error keeping you logged in.',
  invalidSession: 'Your last login may have expired.',
  errorOnLogOut: 'There was an issue logging out. Please try again.',
  getStylesError: 'There was an issue retrieving styles.',
  getAuthorComicsError: 'No comics found by this author.',
  saveToComicError: 'There was an issue saving your image to your comic.',
  miscImageUploadError: 'Something went wrong after uploading your image.'
} as ITranslationTable

export default english