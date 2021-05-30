import React, { useCallback } from 'react'
import { ITask } from '../type'
import { Button } from '@material-ui/core'
import { useDispatch } from '../../app/context'
import { deleteTask } from '../../app/reducer'

export function TaskRemoveButton({ task, disabled }: { task: ITask; disabled?: boolean }) {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch(deleteTask(task.id))
  }, [dispatch, task.id])

  return (
    <Button onClick={onClick} disabled={disabled} variant="outlined">
      Remove
    </Button>
  )
}
