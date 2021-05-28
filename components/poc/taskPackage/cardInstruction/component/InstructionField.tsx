import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core'
import VideoPlayer from '../../../../video/VideoPlayer'
import { IInstructionInfo, InstructionCardType } from '../type'

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(2),
  },
}))

export function InstructionFieldText({ item }: { item: IInstructionInfo }) {
  return <Typography>{item.value}</Typography>
}
export function InstructionFieldImage({ item }: { item: IInstructionInfo }) {
  return <img src={item.value} alt={item.name} />
}

export function InstructionFieldVideo({ item }: { item: IInstructionInfo }) {
  return <VideoPlayer url={item.value} uniqueId={`video-${item.id}`} />
}

function InstructionFieldContent({ item }: { item: IInstructionInfo }) {
  switch (item.type) {
    case InstructionCardType.IMAGE: {
      return <InstructionFieldImage item={item} />
    }
    case InstructionCardType.VIDEO: {
      return <InstructionFieldVideo item={item} />
    }
    case InstructionCardType.TEXT:
    default: {
      return <InstructionFieldText item={item} />
    }
  }
}

export function InstructionField({ item }: { item: IInstructionInfo }) {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.field}>
      <CardHeader title={item.name} />
      <CardContent>
        <InstructionFieldContent item={item} />
      </CardContent>
    </Card>
  )
}
