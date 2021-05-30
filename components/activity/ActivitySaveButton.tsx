import { Button } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDispatch } from '../app/context'
import { saveActivity, saveTask } from '../app/reducer'
import { IActivityRecord } from '../poc/type'
import { useRouter } from 'next/router'

export function ActivitySaveButton({
  item: activity,
  disabled,
}: {
  item: IActivityRecord
  disabled?: boolean
}) {
  const dispatch = useDispatch()
  const router = useRouter()

  const onClick = useCallback(() => {
    dispatch(saveActivity(activity.id))
    activity.items.forEach((taskId) => {
      dispatch(saveTask(taskId))
    })
    router.push(`/edit/${activity.id}`)
  }, [dispatch, activity.id, activity.items, router])

  return (
    <Button onClick={onClick} disabled={disabled} variant="outlined">
      Save
    </Button>
  )
}
