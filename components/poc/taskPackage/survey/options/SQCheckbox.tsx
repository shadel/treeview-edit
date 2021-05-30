import { TextField } from '@material-ui/core'
import { ChangeEventHandler, useCallback } from 'react'
import { ListItemLayout } from '../../../layout/ListItemLayout'
import { ISQCheckbox } from '../type'

export function SQCheckbox(props: {
  item: ISQCheckbox
  onChange: (func: (items: ISQCheckbox[]) => ISQCheckbox[]) => void
  disabled: boolean
  classes: { root: string; formControl: string }
  canAdd: boolean
  canRemove: boolean
  newItem: (list: ISQCheckbox[]) => ISQCheckbox
}) {
  const { item, onChange, disabled, classes } = props
  const onAnswerChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback(
    (event) => {
      onChange((list) =>
        list.map((old) => {
          if (old.id !== item.id) {
            return old
          }
          return { ...old, answer: event.target.value }
        })
      )
    },
    [onChange, item]
  )

  return (
    <ListItemLayout {...props}>
      <TextField
        id="outlined-basic"
        label="Answer"
        variant="outlined"
        value={item.value}
        fullWidth={true}
        onChange={onAnswerChange}
        disabled={disabled}
        className={classes.root}
      />
    </ListItemLayout>
  )
}
