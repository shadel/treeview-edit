import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDispatch } from '../../../../app/context'
import { updateTask } from '../../../../app/reducer'
import { TaskLayoutWraper } from '../../../layout/TaskLayout'
import { InstructionTypeList, ITaskInstructionCard } from '../type'
import { InstructionField } from './InstructionField'

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(2),
  },
}))

function View({ task, disabled }: { task: ITaskInstructionCard; disabled?: boolean }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const onChangeInstruction = useCallback(
    (instructionId: string) => {
      dispatch(
        updateTask({
          ...task,
          properties: {
            instruction: InstructionTypeList.find(({ id }) => id === instructionId),
          },
        })
      )
    },
    [task, dispatch]
  )
  const onOptionChange: (
    event: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => void = useCallback(
    (event) => {
      onChangeInstruction(event.target.value)
    },
    [onChangeInstruction]
  )

  return (
    <TaskLayoutWraper task={task} disabled={disabled}>
      <FormControl fullWidth={true} variant="outlined" className={classes.field}>
        <InputLabel id="demo-simple-select-label">Instruction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task.properties.instruction.id}
          onChange={onOptionChange}
          label="Instruction Type"
          disabled={disabled}
        >
          {InstructionTypeList.map((item) => (
            <MenuItem value={item.id} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InstructionField item={task.properties.instruction} />
    </TaskLayoutWraper>
  )
}

export default View
