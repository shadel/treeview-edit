export enum SmartDataType {
  ACTIVITY,
  TASK,
}

export interface ISmartData {
  name: string
  id: string
  type: SmartDataType
  items: ISmartData[]
}

export type OnChangeFunc<T> = (func: (data: T) => T) => void
