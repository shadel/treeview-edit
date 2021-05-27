import { ISmartData, SmartDataType } from '../dnd-tree/type'
import { IActivity, ITask } from './type'
import taskPackageF from './taskPackage'
import { useCallback } from 'react'
import { IStore, useSelector } from '../app/context'

export function valueParse(value: unknown) {
  try {
    return JSON.parse(value as string)
  } catch (error) {
    return {}
  }
}
export function isActivity(item: IActivity | ITask): item is IActivity {
  return (item as IActivity).items !== undefined
}

export function queryChildActivity(store: IStore, node: ISmartData): ISmartData[] {
  const activity = store.activities.find((item) => item.id === node.data)
  if (!activity) {
    return []
  }
  const tasks = store.tasks
    .filter((item) => activity.items.includes(item.id))
    .sort((a, b) => activity.items.indexOf(a.id) - activity.items.indexOf(b.id))
  return tasks.map((item) => ({
    id: `${node.id}.${item.id}`,
    data: item.id,
    name: item.name,
    type: SmartDataType.TASK,
    items: [],
    disabled: node.disabled,
  }))
}

export function queryChildTask(store: IStore, node: ISmartData) {
  const nodeData = store.tasks.find((item) => item.id === node.data)
  if (!nodeData) {
    return []
  }
  const tPack = taskPackageF.get(nodeData.type)
  if (tPack) {
    return tPack.queryChilds(store, nodeData, node)
  }
  return []
}

export function queryChild(store: IStore, node: ISmartData): ISmartData[] {
  switch (node.type) {
    case SmartDataType.ACTIVITY:
      return queryChildActivity(store, node)
    case SmartDataType.TASK:
      return queryChildTask(store, node)
    default:
      return []
  }
}

export function queryTree(store: IStore, rootNode: ISmartData) {
  return {
    ...rootNode,
    items: queryChild(store, rootNode).map((item) => queryTree(store, item)),
  }
}

export function useChild(node: ISmartData): ISmartData[] {
  const selector = useCallback(
    (store: IStore) => {
      return queryChild(store, node)
    },
    [node]
  )
  return useSelector(selector)
}
export function useTreeNode(node: ISmartData) {
  const selector = useCallback(
    (store: IStore) => {
      return queryTree(store, node)
    },
    [node]
  )
  return useSelector(selector)
}
