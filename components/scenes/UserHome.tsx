import Grid from '@material-ui/core/Grid'
import React from 'react'
import { ISmartData } from '../dnd-tree/type'
import LayoutContainer from '../layers/Container'
import { activity } from '../mock/activity'
import { extractTree } from '../poc/helper'
import TreeView from '../poc/TreeView'

function UserHome() {
  const data = React.useMemo(() => [extractTree(activity)], [])
  const [smartData, setSmartData] = React.useState<ISmartData[]>(data)

  return (
    <LayoutContainer>
      <Grid container={true} spacing={8}>
        <Grid item={true} md={12} xs={12}>
          <TreeView datum={smartData} canEdit={true} onChange={setSmartData} />
        </Grid>
      </Grid>
    </LayoutContainer>
  )
}

export default UserHome
