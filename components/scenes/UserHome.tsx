import Grid from '@material-ui/core/Grid'
import React from 'react'
import { ISmartData, SmartDataType } from '../dnd-tree/type'
import LayoutContainer from '../layers/Container'
import TreeView from '../poc/TreeView'

const datum: ISmartData[] = [
  {
    id: '1',
    type: SmartDataType.ACTIVITY,
    items: [
      {
        id: `1.1`,
        items: [],
        type: SmartDataType.TASK,
        name: `VALUE 1.1`,
      },
    ],
    name: `CATEGORY 1`,
  },

  {
    id: '2',
    type: SmartDataType.ACTIVITY,
    items: [
      {
        id: `2.1`,
        items: [],
        type: SmartDataType.TASK,
        name: `VALUE 2.1`,
      },

      {
        id: `2.2`,
        type: SmartDataType.TASK,
        items: [
          {
            id: `2.2.1`,
            items: [],
            type: SmartDataType.ACTIVITY,
            name: `DATA 2.2.1`,
          },
        ],
        name: `VALUE 2.2`,
      },
    ],
    name: `CATEGORY 2`,
  },
]

function UserHome() {
  const [smartData, setSmartData] = React.useState<ISmartData[]>(datum)

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
