import { DropResult } from 'react-beautiful-dnd'
import { ISmartData } from './type'

export type DroppableIdCreaterFunc = (item: ISmartData) => string
export type DroppableIdCreaterFull = (parentFunc?: () => string) => DroppableIdCreaterFunc

export const droppableIdCreaterFunc = (parentFunc?: () => string) => (item: ISmartData) => {
  if (!parentFunc) {
    return `root.${item.id}`
  }
  const parentId = parentFunc()
  return `${parentId}.${item.id}`
}

function getAndRemoveItem(
  tasks: ISmartData[],
  result: DropResult,
  idCreater: DroppableIdCreaterFunc,
  lvl: number
): {
  item: ISmartData | null
  list: ISmartData[]
} {
  let itemResult = null
  const sourceId = result.source.droppableId
  const id = sourceId.split('.')[lvl]

  if (!id) {
    const list = Array.from(tasks)
    const [removed] = list.splice(result.source.index, 1)

    return {
      item: removed,
      list: list,
    }
  }

  const newArray = tasks.map((item) => {
    const dropid = idCreater(item)
    if (dropid !== sourceId) {
      if (item.id !== id) {
        return item
      }
      const parentFunc = droppableIdCreaterFunc(() => idCreater(item))

      const { item: foundItem, list } = getAndRemoveItem(item.items, result, parentFunc, lvl + 1)

      itemResult = foundItem
      return {
        ...item,
        items: list,
      }
    }
    const list = Array.from(item.items)
    const [removed] = list.splice(result.source.index, 1)
    itemResult = removed
    return {
      ...item,
      items: list,
    }
  })

  return {
    item: itemResult,
    list: newArray,
  }
}

function addItem(
  tasks: ISmartData[],
  result: DropResult,
  idCreater: DroppableIdCreaterFunc,
  lvl: number,
  moveItem: ISmartData
): ISmartData[] {
  const destination = result.destination
  if (!destination) {
    return tasks
  }
  const destinationId = destination.droppableId
  const id = destinationId.split('.')[lvl]

  if (!id) {
    const list = Array.from(tasks)
    list.splice(destination.index, 0, moveItem)

    return list
  }
  const newArray = tasks.map((item) => {
    const dropid = idCreater(item)
    if (dropid !== destinationId) {
      if (item.id !== id) {
        return item
      }
      const parentFunc = droppableIdCreaterFunc(() => idCreater(item))

      const list = addItem(item.items, result, parentFunc, lvl + 1, moveItem)

      return {
        ...item,
        items: list,
      }
    }
    const list = Array.from(item.items)
    list.splice(destination.index, 0, moveItem)
    return {
      ...item,
      items: list,
    }
  })

  return newArray
}

export const dropReorder = (idCreater: DroppableIdCreaterFull) => (
  tasks: ISmartData[],
  result: DropResult
): ISmartData[] => {
  if (!result.destination) {
    return tasks
  }

  const { item, list } = getAndRemoveItem(tasks, result, idCreater(), 1)
  if (!item) {
    return tasks
  }
  const newList = addItem(list, result, idCreater(), 1, item)
  return newList
}

export const reorder = dropReorder(droppableIdCreaterFunc)
