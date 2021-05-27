import { DropResult } from 'react-beautiful-dnd'

export enum DropZone {
  TASK_PACKAGE = 'TASK_PACKAGE',
}

function isAddNew(result: DropResult) {
  const { source } = result
  return source.droppableId === DropZone.TASK_PACKAGE
}

export const makeNewDragEnd = ({
  onMove,
  onNew,
}: {
  onMove: (data: string, from: number, to: number) => void
  onNew: (data: string, index: number) => void
}) => (result: DropResult) => {
  console.log(result)
  if (!result.destination) {
    return
  }

  const { source, destination, draggableId } = result
  if (isAddNew(result)) {
    onNew(draggableId, destination.index)
    return
  }
  onMove(draggableId, source.index, destination.index)
}
