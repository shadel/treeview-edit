import { Paper } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { ISmartData, SmartDataType } from '../dnd-tree/type'
import DetailActivity from './DetailActivity'
import DetailTask from './DetailTask'

function DetailPage({ data }: { data: ISmartData }) {
  if (data.type === SmartDataType.ACTIVITY) {
    return <DetailActivity data={data} />
  }
  return <DetailTask data={data} />
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))
function DetailPageWrapper(props: { data: ISmartData }) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <DetailPage {...props} />
    </Paper>
  )
}
export default DetailPageWrapper
