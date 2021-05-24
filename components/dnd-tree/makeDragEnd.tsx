import { DropResult } from 'react-beautiful-dnd'
import { ISmartData, OnChangeFunc } from './type'
import { reorder } from './reorder'

export enum DropZone {
  TASK_PACKAGE = 'TASK_PACKAGE',
}

export const makeDragEnd = (updateTasks: OnChangeFunc<ISmartData[]>) => () => (
  result: DropResult
) => {
  // dropped outside the list
  console.log(result)
  if (!result.destination) {
    return
  }

  const { source, destination, draggableId } = result
  if (source.droppableId === DropZone.TASK_PACKAGE) {
    updateTasks((items) => {
      const newItem: ISmartData = {
        id: `${destination.droppableId}.${new Date().getTime()}`,
        items: [],
        name: `Task ${draggableId}`,
        type: draggableId,
      }
      return items.map((item) => {
        if (item.id === destination.droppableId.replace('root.', '')) {
          item.items.splice(destination.index, 0, newItem)
        }
        return item
      })
    })
    return
  }

  updateTasks((items) => reorder(items, result))
}
