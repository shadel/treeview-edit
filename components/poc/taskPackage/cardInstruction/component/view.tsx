import { TextField } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import { useDispatch } from '../../../../app/context'
import { TaskLayoutWraper } from '../../../layout/TaskLayout'
import { ITask } from '../../../type'

function View({ task, disabled }: { task: ITask; disabled?: boolean }) {
  const dispatch = useDispatch()

  const onNameChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = React.useCallback(
    (event) => {
      dispatch({
        type: `update_task`,
        payload: {
          data: { ...task, name: event.target.value },
        },
      })
    },
    [task, dispatch]
  )

  return (
    <TaskLayoutWraper task={task} disabled={disabled}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={task.name}
        fullWidth={true}
        onChange={onNameChange}
        disabled={disabled}
      />
    </TaskLayoutWraper>
  )
}

export default View
