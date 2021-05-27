import * as React from 'react'
import { TreeView } from '@material-ui/lab'
import DnDTreeItem from './DnDTreeItem'
import DroppableArea from './DroppableArea'
import { ISmartData, OnChangeFunc } from './type'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { CloseSquare, MinusSquare, PlusSquare } from './StyleTreeITem'

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 400,
  },
})

interface IDnDListProps {
  items: ISmartData[]
  updateTasks: OnChangeFunc<ISmartData[]>
  item: (props: {
    task: ISmartData
    idx: number
    onChange: OnChangeFunc<ISmartData | undefined>
  }) => React.ReactNode
  isDragDisabled?: boolean
  lazyLoad?: React.ComponentType<{ id: string }>
  onSelect?: (event: React.ChangeEvent, nodeIds: string[]) => void
  isAddToRoot: boolean
}

const DnDTreeView = ({
  item,
  items: tasks,
  updateTasks,
  isDragDisabled: isDragDisabled,
  lazyLoad,
  onSelect,
  isAddToRoot,
}: IDnDListProps) => {
  const classes = useStyles()

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

  const rootId = tasks[0].id

  const [expandedIds, setExpandIds] = React.useState([rootId])
  const onNodeToggle = React.useCallback(
    (event: React.ChangeEvent, nodeIds: string[]) => {
      setExpandIds(nodeIds)
    },
    [setExpandIds]
  )

  // React.useEffect(() => {
  //   if (!expandedIds.includes(rootId)) {
  //     setExpandIds((ids) => [...ids, rootId])
  //   }
  // }, [expandedIds, rootId])

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      onNodeSelect={onSelect}
      onNodeToggle={onNodeToggle}
      expanded={expandedIds}
    >
      <DroppableArea droppableId="root" type="activty" isCombineEnabled={true}>
        {tasks.map((task, index) => (
          <DnDTreeItem
            task={task}
            key={task.id}
            index={index}
            dropeId="root"
            item={item}
            isDragDisabled={isDragDisabled}
            lazyLoad={lazyLoad}
            onChange={createItemChange(task.id)}
            type="activty"
            isAddToRoot={isAddToRoot}
          />
        ))}
      </DroppableArea>
    </TreeView>
  )
}
export default DnDTreeView
