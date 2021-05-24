import { activityRecords, taskRecords } from '../mock/activity'
import { ITask } from '../poc/type'

export interface MoveTaskAction {
  type: `move_task`
  payload: { activityId: string; taskId: string; from: number; to: number }
}
export interface AddTaskAction {
  type: `add_task`
  payload: { data: ITask; index: number; target: string }
}
export function activityReducer(state = activityRecords, action: MoveTaskAction | AddTaskAction) {
  switch (action.type) {
    case `add_task`: {
      return state.map((item) => {
        if (item.id === action.payload.target) {
          item.items.splice(action.payload.index, 0, action.payload.data.id)
        }
        return { ...item, items: item.items }
      })
    }
    case `move_task`: {
      return state.map((item) => {
        if (item.id === action.payload.activityId) {
          const element = item.items[action.payload.from]
          item.items.splice(action.payload.from, 1)
          item.items.splice(action.payload.to, 0, element)
        }
        return { ...item, items: item.items }
      })
    }
  }
  return state
}

export function taskReducer(state = taskRecords, action: AddTaskAction) {
  switch (action.type) {
    case `add_task`: {
      return [action.payload.data, ...state]
    }
  }
  return state
}
