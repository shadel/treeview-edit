import { ISmartData, SmartDataType } from '../dnd-tree/type'
import {
  IActivity,
  ITask,
  ITaskSurvey,
  ITaskSurveyOptions,
  TaskSurveyOptionsType,
  TaskType,
} from './type'

export function isActivity(item: IActivity | ITask): item is IActivity {
  return (item as IActivity).items !== undefined
}

function extractTreeActivity(item: IActivity): ISmartData {
  return {
    id: item.id,
    name: item.name,
    type: SmartDataType.ACTIVITY,
    items: item.items.map(extractTree),
  }
}
function extractTreeTaskSurvey(item: ITaskSurvey): ISmartData {
  function filterOption(options: ITaskSurveyOptions[]) {
    return options.filter(({ type }) => type === TaskSurveyOptionsType.ActivityTemplate)
  }
  function option2Tree(item: ITaskSurveyOptions) {
    return extractTree(item.value as IActivity)
  }
  return {
    id: item.id,
    name: item.name,
    type: SmartDataType.TASK,
    items: filterOption(item.properties.options).map(option2Tree),
  }
}

function extractTreeTask(item: ITask): ISmartData {
  if (item.type === TaskType.Survey) {
    return extractTreeTaskSurvey(item as ITaskSurvey)
  }
  return {
    id: item.id,
    name: item.name,
    type: SmartDataType.TASK,
    items: [],
  }
}

export function extractTree(item: IActivity | ITask) {
  if (isActivity(item)) {
    return extractTreeActivity(item)
  }
  return extractTreeTask(item)
}
