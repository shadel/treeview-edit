import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'
import { ISmartData, SmartDataType } from '../dnd-tree/type'
import TreeView from '../poc/TreeView'
import { IActivityRecord, ITask, TaskType } from '../poc/type'
import { BeforeCapture, DragDropContext, DropResult } from 'react-beautiful-dnd'
import DroppableArea from '../dnd-tree/DroppableArea'
import { DropZone, makeNewDragEnd } from '../dnd-tree/makeDragEnd'
import { IStore, useDispatch, useSelector } from '../app/context'
import { resetServerContext } from 'react-beautiful-dnd'
import taskPackageF from '../poc/taskPackage'
import DetailPage from './DetailPage'
import { ActivityProvider, EditorMode } from './ActivityContext'
import { useTreeNode } from '../poc/helper'
import DraggableChip from './DraggableChip'

// eslint-disable-next-line no-debugger
resetServerContext()

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

function smartSearch(
  list: ISmartData[],
  condition: (item: ISmartData) => boolean
): ISmartData | null {
  for (let idx = 0; idx < list.length; idx++) {
    const element = list[idx]
    if (condition(element)) {
      return element
    }
    const childSearch = smartSearch(element.items, condition)
    if (childSearch) {
      return childSearch
    }
  }
  return null
}

function useActivity(id: string): IActivityRecord | null {
  const activitySelector = useCallback(
    (store: IStore) => store.activities.find((item) => item.id === id),
    [id]
  )
  const activity = useSelector(activitySelector)

  const res = useMemo(() => (activity ? activity : null), [activity])
  return res
}
function ActivityEditor({ id: activityId, mode }: { id: string; mode: EditorMode }) {
  resetServerContext()

  const classes = useStyles()
  const activity = useActivity(activityId)
  const rootNode = {
    id: activity.id,
    data: activity.id,
    name: activity.name,
    type: SmartDataType.ACTIVITY,
    items: [],
  }
  const treeNodeData = useTreeNode(rootNode)
  const smartData = useMemo(() => [treeNodeData], [treeNodeData])

  const [nodeSelected, setNodeSelected] = React.useState('')
  const onSelect = React.useCallback((event: React.ChangeEvent, nodeIds: string[]) => {
    setNodeSelected((nodeIds as unknown) as string)
  }, [])
  const selectedData = React.useMemo(() => {
    return smartSearch(smartData, (data) => data.id === nodeSelected)
  }, [nodeSelected, smartData])

  const dispatch = useDispatch()

  const onMove = useCallback(
    (data: string, from: number, to: number) => {
      const ids = data.split('.')
      const taskId = ids[ids.length - 1]
      dispatch({
        type: `move_task`,
        payload: {
          activityId,
          taskId: taskId,
          from,
          to,
        },
      })
    },
    [activityId, dispatch]
  )
  const [isDragNewPackage, setIsDragNewPackage] = useState(false)

  const onNew = useCallback(
    (type: string, index: number) => {
      const tPack = taskPackageF.get(type as TaskType)

      const newTask: ITask = tPack.createNew()

      dispatch({
        type: `add_task`,
        payload: {
          data: { ...newTask, isDraft: mode === EditorMode.CREATE },
          index,
          target: activityId,
        },
      })
    },
    [activityId, dispatch, mode]
  )
  const onDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragNewPackage(false)
      makeNewDragEnd({ onMove, onNew })(result)
    },
    [onMove, onNew]
  )

  const onBeforeCapture = useCallback((initial: BeforeCapture) => {
    if (taskPackageF.list().findIndex(({ type }) => type === initial.draggableId) >= 0) {
      setIsDragNewPackage(true)
    } else {
      setIsDragNewPackage(false)
    }
    console.log(initial)
  }, [])
  return (
    <ActivityProvider activityId={activityId} mode={mode}>
      <Grid container={true} spacing={8}>
        <Grid item={true} md={4} xs={4}>
          <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
            <Card variant="outlined">
              <CardContent>
                <DroppableArea
                  droppableId={`${DropZone.TASK_PACKAGE}`}
                  type="activty.item"
                  className={classes.root}
                >
                  {taskPackageF.list().map(({ name, type }, idx) => (
                    <DraggableChip
                      chipProps={{
                        label: name,
                        variant: 'outlined',
                      }}
                      key={type}
                      draggableId={`${type}`}
                      index={idx}
                    />
                  ))}
                </DroppableArea>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent className={classes.root}>
                <TreeView
                  datum={smartData}
                  canEdit={true}
                  onSelect={onSelect}
                  isAddToRoot={isDragNewPackage}
                />
              </CardContent>
            </Card>
          </DragDropContext>
        </Grid>
        <Grid item={true} md={8} xs={8}>
          {selectedData && <DetailPage data={selectedData} />}
        </Grid>
      </Grid>
    </ActivityProvider>
  )
}

export default ActivityEditor
