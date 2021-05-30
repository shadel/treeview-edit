import { Button } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDispatch } from '../app/context'
import { deleteActivity, deleteTask } from '../app/reducer'
import { IActivityRecord } from '../poc/type'
import { useRouter } from 'next/router'

export function ActivityRemoveButton({
  item: activity,
  disabled,
}: {
  item: IActivityRecord
  disabled?: boolean
}) {
  const dispatch = useDispatch()
  const router = useRouter()

  const onClick = useCallback(() => {
    router.push(`/`)
    dispatch(deleteActivity(activity.id))
    activity.items.forEach((task) => {
      dispatch(deleteTask(task))
    })
  }, [dispatch, activity.id, activity.items, router])

  return (
    <Button onClick={onClick} disabled={disabled} variant="outlined">
      Remove
    </Button>
  )
}
