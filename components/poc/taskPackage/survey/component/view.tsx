import { Button, TextField, Toolbar, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { ChangeEventHandler, useCallback } from 'react'
import { OnChangeFunc } from '../../../../dnd-tree/type'
import { useDispatch } from '../../../../scenes/context'
import { ITaskSurvey, ITaskSurveyOptions } from '../type'
import { SDAOption } from './SDAOption'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 120,
  },
}))
function View({ task }: { task: ITaskSurvey }) {
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

  const onChangeOptions: OnChangeFunc<ITaskSurveyOptions[]> = useCallback(
    (func) => {
      dispatch({
        type: `update_task`,
        payload: {
          data: {
            ...task,
            properties: {
              ...task.properties,
              options: func(task.properties.options),
            },
          },
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
      />
      <Toolbar disableGutters={true}>
        <Typography variant="h6" className={classes.title}>
          Options
        </Typography>
        <Button color="inherit">Add</Button>
      </Toolbar>
      {task.properties.options.map((option) => (
        <SDAOption option={option} key={option.id} onChange={onChangeOptions} />
      ))}
    </>
  )
}

export default View
