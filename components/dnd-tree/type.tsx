export enum SmartDataType {
  ACTIVITY,
  TASK,
  TASK_OPTION,
}

export interface ISmartData {
  name: string
  id: string
  data: string
  type: SmartDataType
  items: ISmartData[]
  disabled?: boolean
}

export type OnChangeFunc<T> = (func: (data: T) => T) => void
