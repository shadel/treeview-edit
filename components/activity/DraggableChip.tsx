import * as React from 'react'
import { Draggable, DraggableProps } from 'react-beautiful-dnd'
import { Chip, ChipTypeMap } from '@material-ui/core'
import { DefaultComponentProps } from '@material-ui/core/OverridableComponent'

export type DraggableItemProps = Omit<DraggableProps, 'children'>

const DraggableChip = ({
  chipProps,
  ...props
}: DraggableItemProps & { chipProps: DefaultComponentProps<ChipTypeMap> }) => (
  <Draggable {...props}>
    {(provided) => (
      <Chip
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        {...chipProps}
      />
    )}
  </Draggable>
)
export default DraggableChip
