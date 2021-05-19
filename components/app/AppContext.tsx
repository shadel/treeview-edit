import { Session } from 'next-auth'
import React, { createContext, useContext } from 'react'

export interface IAppContext {
  session?: Session
}

export const AppContext = createContext<IAppContext>({})

export function AppContextProvider({
  session,
  children,
}: React.PropsWithChildren<{ session?: Session }>) {
  return <AppContext.Provider value={{ session }}>{children}</AppContext.Provider>
}

export function useSession() {
  const { session } = useContext(AppContext)
  return session
}
