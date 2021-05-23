import Grid from '@material-ui/core/Grid'
import React from 'react'
import { ISmartData } from '../dnd-tree/type'
import LayoutContainer from '../layers/Container'
import { activity } from '../mock/activity'
import { extractTree } from '../poc/helper'
import TreeView from '../poc/TreeView'

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

function UserHome() {
  const data = React.useMemo(() => [extractTree(activity)], [])
  const [smartData, setSmartData] = React.useState<ISmartData[]>(data)
  const [nodeSelected, setNodeSelected] = React.useState('')
  const onSelect = React.useCallback((event: React.ChangeEvent, nodeIds: string[]) => {
    console.log(event, nodeIds)
    setNodeSelected((nodeIds as unknown) as string)
  }, [])
  const selectedData = React.useMemo(() => {
    return smartSearch(smartData, (data) => data.id === nodeSelected)
  }, [nodeSelected, smartData])
  return (
    <LayoutContainer>
      <Grid container={true} spacing={8}>
        <Grid item={true} md={4} xs={4}>
          <TreeView datum={smartData} canEdit={true} onChange={setSmartData} onSelect={onSelect} />
        </Grid>
        <Grid item={true} md={8} xs={8}>
          {selectedData && selectedData.name}
        </Grid>
      </Grid>
    </LayoutContainer>
  )
}

export default UserHome
