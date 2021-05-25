import * as React from 'react'
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import { PropsWithChildren } from 'react'
import clsx from 'clsx'
import createStyles from '@material-ui/core/styles/createStyles'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(() =>
  createStyles({
    draggingOver: {
      backgroundColor: 'rgba(222,236,249,1)',
    },
    notDraggingOver: {
      background: 'none',
    },
  })
)

export type DroppableItemProps = Omit<DroppableProps, 'children'>

const DroppableArea = ({
  children,
  className,
  ...props
}: PropsWithChildren<DroppableItemProps> & {
  className: string
}) => {
  const classes = useStyles()
  return (
    <Droppable {...props}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          className={clsx({
            [classes.draggingOver]: snapshot.isDraggingOver,
            [className]: true,
          })}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
export default DroppableArea
