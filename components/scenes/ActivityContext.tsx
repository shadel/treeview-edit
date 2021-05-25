import { createContext, PropsWithChildren, useContext } from 'react'

export interface IActivityContext {
  activityId: string
}
export const ActivityCContext = createContext<IActivityContext>({
  activityId: '',
})

export function ActivityProvider({ children, ...props }: PropsWithChildren<IActivityContext>) {
  return <ActivityCContext.Provider value={props}>{children}</ActivityCContext.Provider>
}

export function useActivityId() {
  const { activityId } = useContext(ActivityCContext)
  return activityId
}
