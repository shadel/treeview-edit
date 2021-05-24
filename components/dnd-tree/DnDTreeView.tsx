import * as React from 'react'
import { TreeView } from '@material-ui/lab'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DnDTreeItem from './DnDTreeItem'
import DroppableArea from './DroppableArea'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ISmartData, OnChangeFunc } from './type'

interface IDnDListProps {
  items: ISmartData[]
  updateTasks: OnChangeFunc<ISmartData[]>
  classes?: {
    root?: string
    item?: {
      root?: string
    }
  }
  item: (props: {
    task: ISmartData
    idx: number
    onChange: OnChangeFunc<ISmartData | undefined>
  }) => React.ReactNode
  isDragDisabled?: boolean
  lazyLoad?: React.ComponentType<{ id: string }>
  onSelect?: (event: React.ChangeEvent, nodeIds: string[]) => void
}

const DnDTreeView = ({
  classes,
  item,
  items: tasks,
  updateTasks,
  isDragDisabled: isDragDisabled,
  lazyLoad,
  onSelect,
}: IDnDListProps) => {
  const createItemChange = (id: string): OnChangeFunc<ISmartData | undefined> => (func) => {
    return updateTasks((oldData) =>
      oldData
        .map((value) => {
          if (value.id !== id) {
            return value
          }
          return func(value)
        })
        .filter((item): item is ISmartData => !!item)
    )
  }

  return (
    <TreeView
      className={classes ? classes.root : ''}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={onSelect}
    >
      <DroppableArea droppableId="root" type="activty">
        {tasks.map((task, index) => (
          <DnDTreeItem
            task={task}
            key={task.id}
            index={index}
            dropeId="root"
            item={item}
            classes={classes ? classes.item : undefined}
            isDragDisabled={isDragDisabled}
            lazyLoad={lazyLoad}
            onChange={createItemChange(task.id)}
            type="activty"
          />
        ))}
      </DroppableArea>
    </TreeView>
  )
}
export default DnDTreeView
