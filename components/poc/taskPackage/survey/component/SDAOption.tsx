import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
import { OnChangeFunc } from '../../../../dnd-tree/type'
import { valueParse } from '../../../helper'
import { useActivityTemplaties } from '../hepler'
import { ITaskSurveyOptions } from '../type'
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}))

export function SDAOption({
  option,
  onChange,
  disabled,
}: {
  option: ITaskSurveyOptions
  onChange: OnChangeFunc<ITaskSurveyOptions[]>
  disabled?: boolean
}) {
  const classes = useStyles()
  const activityTemplates = useActivityTemplaties()

  const { name, template } = useMemo(() => valueParse(option.value), [option.value])

  const onNameChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = React.useCallback(
    (event) => {
      onChange((olds) => {
        return olds.map((old) => {
          if (option.id !== old.id) {
            return old
          }
          const oldValue = valueParse(old.value)
          return {
            ...old,
            value: JSON.stringify({
              ...oldValue,
              name: event.target.value,
            }),
          }
        })
      })
    },
    [onChange, option.id]
  )

  const onOptionChange: (
    event: React.ChangeEvent<{
      name?: string
      value: unknown
    }>
  ) => void = useCallback(
    (event) => {
      onChange((olds) => {
        return olds.map((old) => {
          if (option.id !== old.id) {
            return old
          }
          const oldValue = valueParse(old.value)
          return {
            ...old,
            value: JSON.stringify({
              ...oldValue,
              template: event.target.value,
            }),
          }
        })
      })
    },
    [onChange, option.id]
  )

  return (
    <Grid container={true} key={option.id} className={classes.root}>
      <Grid item={true} sm={6}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          fullWidth={true}
          onChange={onNameChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item={true} sm={6}>
        <FormControl className={classes.formControl} fullWidth={true} variant="outlined">
          <InputLabel id="demo-simple-select-label">Value</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={template}
            onChange={onOptionChange}
            label="Value"
            disabled={disabled}
          >
            {activityTemplates.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
