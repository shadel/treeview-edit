import * as React from 'react'
import { Draggable, DraggableProps } from 'react-beautiful-dnd'
import { PropsWithChildren } from 'react'

export type DraggableItemProps = Omit<DraggableProps, 'children'>

const DraggableItem = ({ children, ...props }: PropsWithChildren<DraggableItemProps>) => (
  <Draggable {...props}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {children}
      </div>
    )}
  </Draggable>
)
export default DraggableItem
