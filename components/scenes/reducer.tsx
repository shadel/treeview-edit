import { activityRecords, taskRecords } from '../mock/activity'
import { ITask } from '../poc/type'

export interface UpdateTaskAction {
  type: `update_task`
  payload: ITask
}
export interface AddTaskAction {
  type: `add_task`
  payload: { data: ITask; index: number; target: string }
}
export function activityReducer(state = activityRecords, action: AddTaskAction) {
  switch (action.type) {
    case `add_task`: {
      return state.map((item) => {
        if (item.id === action.payload.target) {
          item.items.splice(action.payload.index, 0, action.payload.data.id)
        }
        return item
      })
    }
  }
  return state
}

export function taskReducer(state = taskRecords, action: UpdateTaskAction | AddTaskAction) {
  switch (action.type) {
    case `add_task`: {
      return [action.payload.data, ...state]
    }
  }
  return state
}
