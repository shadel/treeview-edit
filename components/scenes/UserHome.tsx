import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useMemo } from 'react'
import DraggableItem from '../dnd-tree/DraggableItem'
import { ISmartData } from '../dnd-tree/type'
import LayoutContainer from '../layers/Container'
import { extractTree } from '../poc/helper'
import TreeView from '../poc/TreeView'
import { IActivity, tasksPackages } from '../poc/type'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import DroppableArea from '../dnd-tree/DroppableArea'
import Chip from '@material-ui/core/Chip'
import { DropZone, makeDragEnd } from '../dnd-tree/makeDragEnd'
import { IStore, useSelector } from './context'
resetServerContext()
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
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

function useActivity(id: string): IActivity | null {
  const activitySelector = useMemo(
    () => (store: IStore) => store.activities.find((item) => item.id === id),
    [id]
  )
  const activity = useSelector(activitySelector)
  const taskIds = useMemo(() => (activity ? activity.items : []), [activity])

  const taskSelector = useMemo(
    () => (store: IStore) => store.tasks.filter((item) => taskIds.includes(item.id)),
    [taskIds]
  )
  const tasks = useSelector(taskSelector)

  const res = useMemo(
    () =>
      activity
        ? {
            ...activity,
            items: tasks,
          }
        : null,
    [activity, tasks]
  )
  return res
}

function UserHome() {
  const classes = useStyles()
  const activity = useActivity('a1')
  const data = React.useMemo(() => [extractTree(activity)], [activity])
  const [smartData, setSmartData] = React.useState<ISmartData[]>(data)
  const [nodeSelected, setNodeSelected] = React.useState('')
  const onSelect = React.useCallback((event: React.ChangeEvent, nodeIds: string[]) => {
    console.log(event, nodeIds)
    setNodeSelected((nodeIds as unknown) as string)
  }, [])
  const selectedData = React.useMemo(() => {
    return smartSearch(smartData, (data) => data.id === nodeSelected)
  }, [nodeSelected, smartData])

  const onDragEnd = makeDragEnd(setSmartData)()
  return (
    <LayoutContainer>
      <Grid container={true} spacing={8}>
        <Grid item={true} md={4} xs={4}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Card>
              <CardContent className={classes.root}>
                <DroppableArea droppableId={`${DropZone.TASK_PACKAGE}`} type="activty.item">
                  {tasksPackages.map(({ name, type }, idx) => (
                    <DraggableItem
                      draggableId={`${type}`}
                      type={`activty.item`}
                      index={idx}
                      key={type}
                    >
                      <Chip label={name} variant="outlined" />
                    </DraggableItem>
                  ))}
                </DroppableArea>
              </CardContent>
            </Card>
            <TreeView
              datum={smartData}
              canEdit={true}
              onChange={setSmartData}
              onSelect={onSelect}
            />
          </DragDropContext>
        </Grid>
        <Grid item={true} md={8} xs={8}>
          {selectedData && selectedData.name}
        </Grid>
      </Grid>
    </LayoutContainer>
  )
}

export default UserHome
