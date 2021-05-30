import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'
import { ITaskSurvey } from '../type'
import { TaskLayoutWraper } from '../../../layout/TaskLayout'
import { SurveyTypeField } from './SurveyTypeField'
import { OptionTypeField } from './OptionTypeField'
import { OptionComponent } from '../options/OptionComponent'

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
    marginBottom: theme.spacing(2),
  },
}))

function View({ task, disabled }: { task: ITaskSurvey; disabled?: boolean }) {
  const classes = useStyles()

  return (
    <TaskLayoutWraper task={task} disabled={disabled}>
      <SurveyTypeField
        task={task}
        disabled={disabled}
        formControl={classes.formControl}
      ></SurveyTypeField>
      {/* <SDAContent task={task} disabled={disabled} title={classes.title}></SDAContent> */}
      <OptionTypeField task={task} disabled={disabled} formControl={classes.formControl} />
      <OptionComponent task={task} disabled={disabled} formControl={classes.formControl} />
    </TaskLayoutWraper>
  )
}

export default View
