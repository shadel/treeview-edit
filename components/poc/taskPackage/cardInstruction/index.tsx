import { ISmartData } from '../../../dnd-tree/type'
import { ITask, TaskType } from '../../type'
import { IPackage } from '../type'
import View from './component/view'

const PACKAGE_TYPE = TaskType.InstructionCard
const PACKAGE_NAME = 'Instruction Card'

function createNew() {
  const id = new Date().getTime()
  const item: ITask = {
    id: `${id}`,
    name: `${PACKAGE_NAME} ${id}`,
    type: PACKAGE_TYPE,
    properties: {},
  }
  return item
}

function extractTree(): ISmartData[] {
  return []
}

const tPack: IPackage = {
  name: PACKAGE_NAME,
  type: PACKAGE_TYPE,
  createNew,
  queryChilds: extractTree,
  view: View,
}
export default tPack
