import LayoutContainer from '../layers/Container'
import ActivityEditor from '../activity/ActivityEditor'
import { EditorMode } from '../activity/ActivityContext'

function EditActivity({ id: activityId }: { id: string }) {
  if (!activityId) {
    return <>Loading</>
  }
  return (
    <LayoutContainer>
      <ActivityEditor id={activityId} mode={EditorMode.EDIT} />
    </LayoutContainer>
  )
}

export default EditActivity
