import { createContext, useContext } from 'react'

interface AppContextInterface {
  loggedIn: boolean
}

export const AuthContext = createContext<AppContextInterface | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}