import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { activityRecords, taskRecords } from '../mock/activity'
import { IActivityRecord, ITask } from '../poc/type'
import { activityReducer, taskReducer } from './reducer'

export interface IStore {
  tasks: ITask[]
  activities: IActivityRecord[]
}

export interface IUserContext {
  store: IStore
  dispatch: Dispatch<unknown>
}
export const UserContext = createContext<IUserContext>({
  store: { tasks: [], activities: [] },
  dispatch: () => undefined,
})

export function UserProvider({ children, ...props }: PropsWithChildren<IUserContext>) {
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>
}

function composeDispatch<A extends unknown, U extends Dispatch<A>>(dispatchs: U[]) {
  return (action: A) => dispatchs.forEach((dispatch) => dispatch(action))
}

export function UserApp({ children }: PropsWithChildren<Record<string, unknown>>) {
  const [activities, activityDispatch] = useReducer(activityReducer, activityRecords)
  const [tasks, tasksDispatch] = useReducer(taskReducer, taskRecords)
  const dispatch = composeDispatch([activityDispatch, tasksDispatch])
  const store = useMemo(
    () => ({
      activities,
      tasks,
    }),
    [activities, tasks]
  )
  return (
    <UserProvider store={store} dispatch={dispatch}>
      {children}
    </UserProvider>
  )
}

export function useDispatch() {
  const { dispatch } = useContext(UserContext)
  return dispatch
}

export function useStore() {
  const { store } = useContext(UserContext)
  return store
}

export function useSelector<T extends unknown>(selector: (store: IStore) => T) {
  const store = useStore()
  return useMemo(() => selector(store), [store, selector])
}
