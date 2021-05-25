import { ISmartData, SmartDataType } from '../../../dnd-tree/type'
import { IStore } from '../../../scenes/context'
import { valueParse } from '../../helper'
import { TaskType } from '../../type'
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

function extractTreeTaskSurvey(store: IStore, item: ITaskSurvey): ISmartData[] {
  function filterOption(options: ITaskSurveyOptions[]) {
    return options.filter(({ type }) => type === TaskSurveyOptionsType.ActivityTemplate)
  }
  const options = filterOption(item.properties.options).map((item) => ({
    ...item,
    value: valueParse(item.value),
  }))

  const templateIds = options.map((item) => item.value.template)

  const templates = store.activities.filter((item) => templateIds.includes(item.id))

  return options
    .map((item) => {
      const template = templates.find((tItem) => tItem.id === item.value.template)
      if (!template) {
        return undefined
      }
      return {
        id: `${item.id}.option_${item.id}.${item.value.template}`,
        data: item.value.template,
        name: `${item.value.name} ~ ${template.name}`,
        type: SmartDataType.ACTIVITY,
        items: [],
      }
    })
    .filter((item: ISmartData | undefined): item is ISmartData => !!item)
}

const tPack: IPackage = {
  name: PACKAGE_NAME,
  type: PACKAGE_TYPE,
  createNew,
  queryChilds: extractTreeTaskSurvey,
  view: View,
}
export default tPack
