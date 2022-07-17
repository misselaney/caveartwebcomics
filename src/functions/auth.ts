import { createContext, useContext } from 'react'

interface AppContextInterface {
  loggedIn: boolean,
  userId?: number
}

export const AuthContext = createContext<AppContextInterface | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}