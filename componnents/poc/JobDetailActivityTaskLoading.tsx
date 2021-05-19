import * as React from 'react'
import { TreeItem } from '@material-ui/lab'

interface IProps {
  activityId: string
}

const JobDetailActivityTaskLoading = ({ activityId }: IProps) => {
  return <TreeItem nodeId={`loading_${activityId}`} label={`Loading tasks data ...`} />
}

export default React.memo(JobDetailActivityTaskLoading)
