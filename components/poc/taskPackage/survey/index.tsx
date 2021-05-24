import { ISmartData, SmartDataType } from '../../../dnd-tree/type'
import { extractTree } from '../../helper'
import { IActivity, TaskType } from '../../type'
import { IPackage } from '../type'
import View from './component/view'
import { ITaskSurvey, ITaskSurveyOptions, TaskSurveyOptionsType } from './type'

const PACKAGE_TYPE = TaskType.Survey
const PACKAGE_NAME = 'Survey'

function createNew() {
  const id = new Date().getTime()
  const item: ITaskSurvey = {
    id: `${id}`,
    name: `${PACKAGE_NAME} ${id}`,
    type: PACKAGE_TYPE,
    properties: {
      options: [],
    },
  }
  return item
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

const tPack: IPackage = {
  name: PACKAGE_NAME,
  type: PACKAGE_TYPE,
  createNew,
  extractTree: extractTreeTaskSurvey,
  view: View,
}
export default tPack
