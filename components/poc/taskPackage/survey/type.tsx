import { ITask } from '../../type'

export enum TaskSurveyOptionsType {
  Normal,
  ActivityTemplate,
}
export interface ITaskSurveyOptions {
  id: string
  type: TaskSurveyOptionsType
  value: unknown
}

export interface ITaskSurvey extends ITask {
  properties: {
    options: ITaskSurveyOptions[]
  }
}
