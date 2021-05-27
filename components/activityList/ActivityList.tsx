import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo } from 'react'
import { ISmartData, SmartDataType } from '../dnd-tree/type'
import TreeView from '../poc/TreeView'
import { DragDropContext } from 'react-beautiful-dnd'
import { IStore, useSelector } from '../app/context'
import { resetServerContext } from 'react-beautiful-dnd'
import DetailPage from '../activity/DetailPage'
import { useTreeNodes } from '../poc/helper'
import { Button } from '../buttons/Button'
import Link from 'next/link'

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

function useList() {
  const activitySelector = useCallback(
    (store: IStore) => store.activities.filter(({ isDraft }) => !isDraft),
    []
  )
  const list = useSelector(activitySelector)
  return list
}

function ActivityList() {
  resetServerContext()

  const classes = useStyles()
  const list = useList()
  const rootNodes = useMemo(
    () =>
      list.map((activity) => ({
        id: activity.id,
        data: activity.id,
        name: activity.name,
        type: SmartDataType.ACTIVITY,
        items: [],
        disabled: true,
      })),
    [list]
  )
  const smartData = useTreeNodes(rootNodes)

  const [nodeSelected, setNodeSelected] = React.useState('')
  const onSelect = React.useCallback((event: React.ChangeEvent, nodeIds: string[]) => {
    setNodeSelected((nodeIds as unknown) as string)
  }, [])
  const selectedData = React.useMemo(() => {
    return smartSearch(smartData, (data) => data.id === nodeSelected)
  }, [nodeSelected, smartData])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onDragEnd = useCallback(() => {}, [])
  return (
    <Grid container={true} spacing={8}>
      <Grid item={true} md={4} xs={4}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Card variant="outlined">
            <CardContent>
              <Link href="/add">
                <Button>Add Activity</Button>
              </Link>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent className={classes.root}>
              <TreeView datum={smartData} canEdit={true} onSelect={onSelect} />
            </CardContent>
          </Card>
        </DragDropContext>
      </Grid>
      <Grid item={true} md={8} xs={8}>
        {selectedData && <DetailPage data={selectedData} />}
      </Grid>
    </Grid>
  )
}

export default ActivityList
