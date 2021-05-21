export enum TaskType {
  instructionCard = 'instructionCard',
  Survey = 'Survey',
  Photo = 'Photo',
  Video = 'Video',
  UploadFile = 'UploadFile',
  LogonTask = 'LogonTask',
  DocumentAcknowledge = 'DocumentAcknowledge',
}

export interface ITask {
  type: TaskType
  id: string
  name: string
  properties: unknown
}
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
export interface IActivity {
  id: string
  name: string
  items: ITask[]
}
