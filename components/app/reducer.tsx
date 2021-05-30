import { activityRecords, taskRecords } from '../mock/activity'
import { IActivityRecord, ITask } from '../poc/type'

export interface MoveTaskAction {
  type: `move_task`
  payload: { activityId: string; taskId: string; from: number; to: number }
}
export interface AddTaskAction {
  type: `add_task`
  payload: { data: ITask; index: number; target: string }
}
export interface UpdateTaskAction {
  type: `update_task`
  payload: { data: ITask }
}
export function updateTask(data: ITask) {
  return { type: `update_task`, payload: { data } }
}
export interface DeteleTaskAction {
  type: `delete_task`
  payload: { id: string }
}

export function deleteTask(id: string) {
  return { type: `delete_task`, payload: { id } }
}

export interface SaveTaskAction {
  type: `save_task`
  payload: { id: string }
}
export function saveTask(id: string) {
  return {
    type: `save_task`,
    payload: { id },
  }
}

export interface UpdateActivityAction {
  type: `update_activity`
  payload: { data: IActivityRecord }
}
export interface CreateActivityAction {
  type: `create_activity`
  payload: { data: IActivityRecord }
}
export interface DeleteActivityAction {
  type: `delete_activity`
  payload: { id: string; isDraft?: boolean }
}

export function deleteActivity(id: string, isDraft?: boolean) {
  return {
    type: `delete_activity`,
    payload: { id, isDraft },
  }
}
export interface SaveActivityAction {
  type: `save_activity`
  payload: { id: string }
}
export function saveActivity(id: string) {
  return {
    type: `save_activity`,
    payload: { id },
  }
}

export function activityReducer(
  state = activityRecords,
  action:
    | MoveTaskAction
    | AddTaskAction
    | UpdateActivityAction
    | CreateActivityAction
    | DeleteActivityAction
    | SaveActivityAction
) {
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
    case `update_activity`: {
      return state.map((item) => {
        if (item.id === action.payload.data.id) {
          return { ...item, ...action.payload.data }
        }
        return item
      })
    }
    case `create_activity`: {
      return [...state, action.payload.data]
    }
    case `delete_activity`: {
      const { id, isDraft } = action.payload
      return state.filter((item) => {
        if (!isDraft) {
          return item.id !== id
        }
        return item.id !== id || !item.isDraft
      })
    }
    case `save_activity`: {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, isDraft: false }
        }
        return item
      })
    }
  }
  return state
}

export function taskReducer(
  state = taskRecords,
  action: AddTaskAction | UpdateTaskAction | DeteleTaskAction | SaveTaskAction
) {
  switch (action.type) {
    case `add_task`: {
      return [action.payload.data, ...state]
    }
    case `update_task`: {
      const { data } = action.payload
      return state.map((item) => {
        if (item.id !== data.id) {
          return item
        }
        return { ...item, ...data }
      })
    }
    case `delete_task`: {
      return state.filter(({ id }) => id !== action.payload.id)
    }
    case `save_task`: {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return { ...item, isDraft: false }
      })
    }
  }
  return state
}
