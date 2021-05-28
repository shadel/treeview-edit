import { Button, TextField, Toolbar, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { ChangeEventHandler, useCallback } from 'react'
import { OnChangeFunc } from '../../../../dnd-tree/type'
import { useDispatch } from '../../../../app/context'
import { useActivityTemplaties } from '../hepler'
import { ITaskSurvey, ITaskSurveyOptions, TaskSurveyOptionsType } from '../type'
import { SDAOption } from './SDAOption'
import { TaskLayoutWraper } from '../../../layout/TaskLayout'
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
function View({ task, disabled }: { task: ITaskSurvey; disabled?: boolean }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const activityTemplates = useActivityTemplaties()

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

  const onAddOption = useCallback(() => {
    const newOption = {
      id: `${new Date().getTime()}`,
      type: TaskSurveyOptionsType.ActivityTemplate,
      value: JSON.stringify({
        name: `Option ${task.properties.options.length + 1}`,
        template: activityTemplates[0].id,
      }),
    }
    dispatch({
      type: `update_task`,
      payload: {
        data: {
          ...task,
          properties: {
            ...task.properties,
            options: [...task.properties.options, newOption],
          },
        },
      },
    })
  }, [task, dispatch, activityTemplates])

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
      <Toolbar disableGutters={true}>
        <Typography variant="h6" className={classes.title}>
          Options
        </Typography>
        <Button
          color="inherit"
          onClick={onAddOption}
          disabled={disabled || activityTemplates.length === 0}
        >
          Add
        </Button>
      </Toolbar>
      {task.properties.options.map((option) => (
        <SDAOption option={option} key={option.id} onChange={onChangeOptions} disabled={disabled} />
      ))}
    </TaskLayoutWraper>
  )
}

export default View
