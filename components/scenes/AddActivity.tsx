import LayoutContainer from '../layers/Container'
import ActivityEditor from '../activity/ActivityEditor'
import { useDispatch } from '../app/context'
import { useEffect, useState } from 'react'
import { EditorMode } from '../activity/ActivityContext'
import { IActivityRecord } from '../poc/type'

function AddActivity() {
  const [activityId, setActivityId] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const draftId = `A_${new Date().getTime()}`
    const activity: IActivityRecord = {
      id: draftId,
      items: [],
      name: `New Activity`,
      isDraft: true,
    }
    dispatch({
      type: `create_activity`,
      payload: {
        data: activity,
      },
    })
    setActivityId(draftId)
    return () => {
      dispatch({
        type: `delete_activity`,
        payload: {
          id: draftId,
          isDraft: true,
        },
      })
    }
  }, [dispatch])

  if (!activityId) {
    return <LayoutContainer>Data creating</LayoutContainer>
  }
  return (
    <LayoutContainer>
      <ActivityEditor id={activityId} mode={EditorMode.CREATE} />
    </LayoutContainer>
  )
}

export default AddActivity
