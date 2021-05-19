import * as React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { ISmartData } from '../dnd-tree/type'

interface IProps {
  item: ISmartData
  idx: number
  isEditMode: boolean
}

const useTreeItemStyles = makeStyles((theme) => ({
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}))

const TreeItem = ({ item: activity }: IProps) => {
  const classes = useTreeItemStyles()

  return (
    <div className={classes.labelRoot}>
      <Typography variant="body2" className={classes.labelText}>
        {activity.name}
      </Typography>
    </div>
  )
}

export default TreeItem
