import { ITask } from '../../type'

export enum TaskSurveyOptionsType {
  Normal,
  ActivityTemplate,
}

export enum SQOptionType {
  SHORT_ANSWER = 'SHORT_ANSWER',
  PARAGRAPH = 'PARAGRAPH',
  MULTIPLE_CHECKBOX = 'MULTIPLE_CHECKBOX',
  DROPDOWN = 'DROPDOWN',
  DATE = 'DATE',
}

export const SQOptionList = [
  { type: SQOptionType.SHORT_ANSWER, name: 'Short Answer' },
  { type: SQOptionType.PARAGRAPH, name: 'Paragraph' },
  { type: SQOptionType.MULTIPLE_CHECKBOX, name: 'Multiple Checkbox' },
  { type: SQOptionType.DROPDOWN, name: 'Dropdown' },
  { type: SQOptionType.DATE, name: 'Date' },
]

export interface ISQOptionShortAnswer {
  type: SQOptionType.SHORT_ANSWER
}
export interface ISQOptionParagraph {
  type: SQOptionType.PARAGRAPH
}
export interface ISQCheckbox {
  id: string
  value: string
}
export interface ISQOptionMultipleCheckbox {
  type: SQOptionType.MULTIPLE_CHECKBOX
  value: ISQCheckbox[]
}
export interface ISQOptionDropDown {
  type: SQOptionType.DROPDOWN
  value: ISQCheckbox[]
}

export interface ISQOptionDate {
  type: SQOptionType.DATE
}

export type ITaskSurveySQOption =
  | ISQOptionShortAnswer
  | ISQOptionParagraph
  | ISQOptionMultipleCheckbox
  | ISQOptionDropDown
  | ISQOptionDate

export enum SDAOptionType {
  BOOLEAN = 'BOOLEAN',
  REPEAT = 'REPEAT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
}

export const SDAOptionList = [
  { type: SDAOptionType.BOOLEAN, name: 'Boolean' },
  { type: SDAOptionType.REPEAT, name: 'Repeat' },
  { type: SDAOptionType.MULTIPLE_CHOICE, name: 'Multiple Choice' },
  { type: SDAOptionType.CHECKBOX, name: 'Checkbox' },
]

export interface ISDAOptionBoolean {
  type: SDAOptionType.BOOLEAN
  value: string
}
export interface ISDAOptionRepeat {
  type: SDAOptionType.REPEAT
  value: string
}
export interface ISDAChoice {
  id: string
  answer: string
  value: string
}
export interface ISDAOptionMultipleChoice {
  type: SDAOptionType.MULTIPLE_CHOICE
  value: ISDAChoice[]
}
export interface ISDAOptionCheckbox {
  type: SDAOptionType.CHECKBOX
  value: ISDAChoice[]
}

export type ITaskSurveySDAOption =
  | ISDAOptionBoolean
  | ISDAOptionRepeat
  | ISDAOptionMultipleChoice
  | ISDAOptionCheckbox

export type ITaskSurveyOptions = ITaskSurveySQOption | ITaskSurveySDAOption

export interface ITaskSurvey extends ITask {
  properties: {
    generateActivity: boolean
    surveyType: TaskSurveyOptionsType
    option: ITaskSurveyOptions
  }
}
