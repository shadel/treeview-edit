import { ISmartData } from '../../../dnd-tree/type'
import { IStore } from '../../../app/context'
import { TaskType } from '../../type'
import { IPackage } from '../type'
import View from './component/view'
import { ITaskSurvey, SQOptionType, TaskSurveyOptionsType } from './type'
import { extractTree } from './options/extractTree'

const PACKAGE_TYPE = TaskType.Survey
const PACKAGE_NAME = 'Survey'

function createNew() {
  const id = new Date().getTime()
  const item: ITaskSurvey = {
    id: `${id}`,
    name: `${PACKAGE_NAME} ${id}`,
    type: PACKAGE_TYPE,
    properties: {
      generateActivity: false,
      surveyType: TaskSurveyOptionsType.Normal,
      option: {
        type: SQOptionType.SHORT_ANSWER,
      },
    },
  }
  return item
}

function extractTreeTaskSurvey(store: IStore, item: ITaskSurvey, node: ISmartData): ISmartData[] {
  return extractTree({ store, item, node })
}

const tPack: IPackage = {
  name: PACKAGE_NAME,
  type: PACKAGE_TYPE,
  createNew,
  queryChilds: extractTreeTaskSurvey,
  view: View,
}
export default tPack
