import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from '../../../../app/context'
import { ITaskSurvey, TaskSurveyOptionsType } from '../type'
import { updateTask } from '../../../../app/reducer'

export enum TaskSurveyType {
  Question,
  SDA_Activity,
  SDA_Task,
}

const TypeDisplayMapping = [
  {
    display: TaskSurveyType.Question,
    data: { surveyType: TaskSurveyOptionsType.Normal, generateActivity: false },
  },
  {
    display: TaskSurveyType.SDA_Task,
    data: {
      surveyType: TaskSurveyOptionsType.ActivityTemplate,
      generateActivity: false,
    },
  },
  {
    display: TaskSurveyType.SDA_Activity,
    data: {
      surveyType: TaskSurveyOptionsType.ActivityTemplate,
      generateActivity: true,
    },
  },
]

export function display2Data(display: TaskSurveyType) {
  return TypeDisplayMapping.find((item) => item.display === display).data
}
function data2Display({
  surveyType,
  generateActivity,
}: {
  surveyType: TaskSurveyOptionsType
  generateActivity: boolean
}) {
  return TypeDisplayMapping.find(
    (item) => item.data.generateActivity === generateActivity && item.data.surveyType === surveyType
  ).display
}

export const SURVEY_TYPES = [
  {
    name: `Survey Question`,
    type: TaskSurveyType.Question,
  },
  {
    name: `Survey Driven Activity, generate task`,
    type: TaskSurveyType.SDA_Task,
  },
  {
    name: `Survey Driven Activity, generate activity`,
    type: TaskSurveyType.SDA_Activity,
  },
]
export function SurveyTypeField({
  task,
  ...props
}: {
  task: ITaskSurvey
  formControl: string
  disabled: boolean
}) {
  const dispatch = useDispatch()
  const onOptionChange: (
    event: React.ChangeEvent<{
      name?: string
      value: TaskSurveyType
    }>
  ) => void = useCallback(
    (event) => {
      dispatch(
        updateTask({
          ...task,
          properties: {
            ...task.properties,
            ...display2Data(event.target.value),
          },
        })
      )
    },
    [task, dispatch]
  )

  const surveyDisplayType = useMemo(() => {
    const surveyType = task.properties.surveyType
    const generateActivity = task.properties.generateActivity

    return data2Display({ surveyType, generateActivity })
  }, [task.properties.generateActivity, task.properties.surveyType])

  return (
    <FormControl className={props.formControl} fullWidth={true} variant="outlined">
      <InputLabel id="demo-simple-select-label">Survey Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={surveyDisplayType}
        onChange={onOptionChange}
        label="Survey Type"
        disabled={props.disabled}
      >
        {SURVEY_TYPES.map((item) => (
          <MenuItem value={item.type} key={item.type}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
