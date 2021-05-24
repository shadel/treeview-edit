export enum TaskType {
  InstructionCard = 'InstructionCard',
  Survey = 'Survey',
  Photo = 'Photo',
  Video = 'Video',
  UploadFile = 'UploadFile',
  LogonTask = 'LogonTask',
  DocumentAcknowledge = 'DocumentAcknowledge',
}

export interface ITaskPackage {
  name: string
  type: TaskType
}

export const tasksPackages = [
  {
    name: 'Instruction Card',
    type: TaskType.InstructionCard,
  },
  {
    name: 'Survey',
    type: TaskType.Survey,
  },
  {
    name: 'Photo',
    type: TaskType.Photo,
  },
  {
    name: 'Video',
    type: TaskType.Video,
  },
  {
    name: 'Upload File',
    type: TaskType.UploadFile,
  },
  {
    name: 'Logon Task',
    type: TaskType.LogonTask,
  },
  {
    name: 'Document Acknowledge',
    type: TaskType.DocumentAcknowledge,
  },
]

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

export interface IActivityRecord {
  id: string
  name: string
  items: string[]
}
