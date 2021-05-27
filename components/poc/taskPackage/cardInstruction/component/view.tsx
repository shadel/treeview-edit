import { TextField } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import { useDispatch } from '../../../../app/context'
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
    <>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={task.name}
        fullWidth={true}
        onChange={onNameChange}
        disabled={disabled}
      />
    </>
  )
}

export default View
