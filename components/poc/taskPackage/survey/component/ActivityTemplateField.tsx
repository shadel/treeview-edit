import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useCallback } from 'react'

import { useActivityTemplaties } from '../hepler'

export function ActivityTemplateField({
  templateId,
  onChange,
  ...props
}: {
  templateId: string
  onChange: (id: string) => void
  formControl?: string
  disabled: boolean
}) {
  const activityTemplates = useActivityTemplaties()
  const onOptionChange: (
    event: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => void = useCallback(
    (event) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <FormControl className={props.formControl} fullWidth={true} variant="outlined">
      <InputLabel id="demo-simple-select-label">Template</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={templateId}
        onChange={onOptionChange}
        label="Template"
        disabled={props.disabled}
      >
        {activityTemplates.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
