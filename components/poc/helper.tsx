import { ISmartData, SmartDataType } from '../dnd-tree/type'
import { IActivity, ITask } from './type'
import taskPackageF from './taskPackage'

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

function extractTreeTask(item: ITask): ISmartData {
  const tPack = taskPackageF.get(item.type)
  if (tPack) {
    return tPack.extractTree(item)
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
