import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from '../../../../app/context'
import {
  ITaskSurvey,
  SDAOptionList,
  SDAOptionType,
  SQOptionList,
  SQOptionType,
  TaskSurveyOptionsType,
} from '../type'
import { updateTask } from '../../../../app/reducer'
import { createNew } from '../options/createNew'
import { useActivityTemplaties } from '../hepler'

export function OptionTypeField({
  task,
  ...props
}: {
  task: ITaskSurvey
  formControl: string
  disabled: boolean
}) {
  const activityTemplates = useActivityTemplaties()
  const dispatch = useDispatch()
  const onOptionChange: (
    event: React.ChangeEvent<{
      name?: string
      value: SQOptionType | SDAOptionType
    }>
  ) => void = useCallback(
    (event) => {
      const newOption = createNew({ task, templates: activityTemplates, type: event.target.value })
      dispatch(
        updateTask({
          ...task,
          properties: {
            ...task.properties,
            option: newOption,
          },
        })
      )
    },
    [task, dispatch, activityTemplates]
  )

  const surveyOptionType = useMemo(() => {
    return task.properties.option.type
  }, [task.properties.option.type])

  const surveyOptionList = useMemo(() => {
    if (task.properties.surveyType === TaskSurveyOptionsType.Normal) {
      return SQOptionList
    }
    return SDAOptionList
  }, [task.properties.surveyType])

  return (
    <FormControl className={props.formControl} fullWidth={true} variant="outlined">
      <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={surveyOptionType}
        onChange={onOptionChange}
        label="Survey Type"
        disabled={props.disabled}
      >
        {surveyOptionList.map((item) => (
          <MenuItem value={item.type} key={item.type}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
