import { createContext, PropsWithChildren, useContext } from 'react'

export enum EditorMode {
  EDIT,
  CREATE,
  VIEW,
}

export interface IActivityContext {
  activityId: string
  mode: EditorMode
}
export const ActivityCContext = createContext<IActivityContext>({
  activityId: '',
  mode: EditorMode.VIEW,
})

export function ActivityProvider({ children, ...props }: PropsWithChildren<IActivityContext>) {
  return <ActivityCContext.Provider value={props}>{children}</ActivityCContext.Provider>
}

export function useActivityId() {
  const { activityId } = useContext(ActivityCContext)
  return activityId
}

export function useEditorMode() {
  const { mode } = useContext(ActivityCContext)
  return mode
}
