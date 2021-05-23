import * as React from 'react'
import { Icon, createStyles, makeStyles } from '@material-ui/core'
import TreeItem from './TreeItem'
import classNames from 'classnames'
import { ISmartData, OnChangeFunc } from '../dnd-tree/type'
import DnDTreeView from '../dnd-tree/DnDTreeView'
import JobDetailActivityTaskLoading from './JobDetailActivityTaskLoading'

const useStyles = makeStyles(() =>
  createStyles({
    buttonSaving: {
      animation: '$rotate 1.5s linear infinite',
      position: 'absolute',
      right: 20,
    },
    tableTitle: {
      color: '#999',
      padding: 4,
      fontSize: 12,
      lineHeight: 'normal',
    },
  })
)

interface IProps {
  datum: ISmartData[]
  canEdit: boolean
  onChange: OnChangeFunc<ISmartData[]>
  isSaving?: boolean
  createLazyloadingFunc?: () => React.ComponentType<{ id: string }>
  onSelect?: (event: React.ChangeEvent, nodeIds: string[]) => void
}

const createItem = (isEditMode: boolean) => {
  return function CreateItem({ task, idx }: { task: ISmartData; idx: number }) {
    return <TreeItem isEditMode={isEditMode} item={task} idx={idx} />
  }
}

const createLazyloading = () => {
  return function LazyLoading({ id }: { id: string }) {
    return <JobDetailActivityTaskLoading activityId={id} />
  }
}

const TreeView = ({
  datum: activities,
  canEdit,
  onChange,
  isSaving,
  createLazyloadingFunc = createLazyloading,
  onSelect,
}: IProps) => {
  const classes = useStyles()

  const lazyTasksComponent = React.useMemo(() => createLazyloadingFunc(), [createLazyloadingFunc])
  return (
    <React.Fragment>
      {isSaving && (
        <div>
          <Icon className={classNames(classes.buttonSaving)}>loop</Icon>
        </div>
      )}
      <DnDTreeView
        items={activities}
        item={createItem(canEdit)}
        updateTasks={onChange}
        isDragDisabled={!canEdit || isSaving}
        lazyLoad={lazyTasksComponent}
        onSelect={onSelect}
      />
    </React.Fragment>
  )
}

export default TreeView
