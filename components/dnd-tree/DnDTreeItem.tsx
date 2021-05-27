import * as React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createStyles, makeStyles } from '@material-ui/core'
import DraggableItem from './DraggableItem'
import DroppableArea from './DroppableArea'
import classNames from 'classnames'
import { ISmartData, OnChangeFunc } from './type'
import StyledTreeItem from './StyleTreeITem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
    },
  })
)

// const useTreeItemStyles = makeStyles((theme) => ({
//   root: {
//     color: theme.palette.text.secondary,
//     '&:hover > $content': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     '&:focus > $content, &$selected > $content': {
//       backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
//       color: 'var(--tree-view-color)',
//     },
//     '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
//       backgroundColor: 'transparent',
//     },
//   },
//   content: {
//     color: theme.palette.text.secondary,
//     borderTopRightRadius: theme.spacing(2),
//     borderBottomRightRadius: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     fontWeight: theme.typography.fontWeightMedium,
//     '$expanded > &': {
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   },
//   group: {
//     marginLeft: theme.spacing(2),
//     '& $content': {
//       paddingLeft: theme.spacing(0),
//     },
//   },
//   expanded: {},
//   selected: {},
//   label: {
//     fontWeight: 'inherit',
//     color: 'inherit',
//   },
//   labelRoot: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0.5, 0),
//   },
//   labelIcon: {
//     marginRight: theme.spacing(1),
//   },
//   labelText: {
//     fontWeight: 'inherit',
//     flexGrow: 1,
//   },
// }))

function onLabelClick(event: React.MouseEvent) {
  event.preventDefault()
}

const DnDTreeItem = ({
  task,
  index,
  dropeId,
  item,
  classes,
  isDragDisabled: isDragDisabled,
  lazyLoad: LazyLoadComponent,
  onChange,
  type,
  isAddToRoot,
}: {
  task: ISmartData
  index: number
  dropeId: string
  item: (props: {
    task: ISmartData
    idx: number
    activityId?: string
    onChange: OnChangeFunc<ISmartData | undefined>
  }) => React.ReactNode
  classes?: {
    root?: string
  }
  isDragDisabled?: boolean
  lazyLoad?: React.ComponentType<{ id: string }>
  onChange: OnChangeFunc<ISmartData | undefined>
  type: string
  isAddToRoot?: boolean
}) => {
  const localClasses = useStyles({})
  // const newClasses = useTreeItemStyles()

  const tasks = task.items

  const createItemChange = (id: string): OnChangeFunc<ISmartData | undefined> => (func) => {
    return onChange((oldData) => {
      if (!oldData) {
        return
      }
      return {
        ...oldData,
        items: oldData.items
          .map((value) => {
            if (value.id !== id) {
              return value
            }
            return func(value)
          })
          .filter((item): item is ISmartData => !!item),
      }
    })
  }
  return (
    <DraggableItem
      draggableId={`${dropeId}.${task.id}`}
      index={index}
      isDragDisabled={isDragDisabled || task.disabled}
    >
      {tasks.length === 0 && (
        <>
          {!isAddToRoot && (
            <>
              <StyledTreeItem
                nodeId={task.id}
                className={
                  classes ? classNames(classes.root, localClasses.root) : localClasses.root
                }
                label={item({ task, idx: index, onChange })}
                onLabelClick={onLabelClick}
              />
              <DroppableArea
                droppableId={`${dropeId}.${task.id}`}
                type={`${type}.item`}
              ></DroppableArea>
            </>
          )}
          {isAddToRoot && (
            <StyledTreeItem
              nodeId={task.id}
              className={classes ? classNames(classes.root, localClasses.root) : localClasses.root}
              label={item({ task, idx: index, onChange })}
              onLabelClick={onLabelClick}
            >
              <DroppableArea
                droppableId={`${dropeId}.${task.id}`}
                type={`${type}.item`}
              ></DroppableArea>
            </StyledTreeItem>
          )}
        </>
      )}
      {tasks.length > 0 && (
        <StyledTreeItem
          nodeId={task.id}
          className={classes ? classNames(classes.root, localClasses.root) : localClasses.root}
          label={item({ task, idx: index, onChange })}
          onLabelClick={onLabelClick}
        >
          {/* {!tasks && LazyLoadComponent && <LazyLoadComponent id={task.id} />} */}
          {tasks && (
            <DroppableArea droppableId={`${dropeId}.${task.id}`} type={`${type}.item`}>
              {tasks.map((taskItem, idx) => (
                <DnDTreeItem
                  task={taskItem}
                  index={idx}
                  dropeId={`${dropeId}.${task.id}`}
                  item={item}
                  classes={classes}
                  isDragDisabled={isDragDisabled}
                  lazyLoad={LazyLoadComponent}
                  key={taskItem.id}
                  onChange={createItemChange(taskItem.id)}
                  type={`${type}.item`}
                ></DnDTreeItem>
              ))}
            </DroppableArea>
          )}
        </StyledTreeItem>
      )}
    </DraggableItem>
  )
}
export default DnDTreeItem
