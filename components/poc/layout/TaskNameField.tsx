import React, { ChangeEventHandler } from 'react'
import { ITask } from '../type'
import { makeStyles, TextField } from '@material-ui/core'
import { useDispatch } from '../../app/context'
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))
export function TaskNameField({ task, disabled }: { task: ITask; disabled?: boolean }) {
  const classes = useStyles()
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
    <TextField
      id="outlined-basic"
      label="Name"
      variant="outlined"
      value={task.name}
      fullWidth={true}
      onChange={onNameChange}
      disabled={disabled}
      className={classes.root}
    />
  )
}
