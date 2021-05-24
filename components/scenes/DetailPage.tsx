import { Paper } from '@material-ui/core'
import { ISmartData, SmartDataType } from '../dnd-tree/type'
import DetailActivity from './DetailActivity'
import DetailTask from './DetailTask'

function DetailPage({ data }: { data: ISmartData }) {
  if (data.type === SmartDataType.ACTIVITY) {
    return <DetailActivity data={data} />
  }
  return <DetailTask data={data} />
}

function DetailPageWrapper(props: { data: ISmartData }) {
  return (
    <Paper>
      <DetailPage {...props} />
    </Paper>
  )
}
export default DetailPageWrapper
