import { Grid, TextField } from '@material-ui/core'
import { ChangeEventHandler, useCallback } from 'react'
import { ListItemLayout } from '../../../layout/ListItemLayout'
import { ActivityTemplateField } from '../component/ActivityTemplateField'
import { ISDAChoice } from '../type'

export function SDAChoice(props: {
  item: ISDAChoice
  onChange: (func: (items: ISDAChoice[]) => ISDAChoice[]) => void
  disabled: boolean
  classes: { root: string; formControl: string }
  canAdd: boolean
  canRemove: boolean
  newItem: (list: ISDAChoice[]) => ISDAChoice
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
  const onTemplateChange = useCallback(
    (id: string) => {
      onChange((list) =>
        list.map((old) => {
          if (old.id !== item.id) {
            return old
          }
          return { ...old, value: id }
        })
      )
    },
    [onChange, item]
  )

  return (
    <ListItemLayout {...props}>
      <Grid container={true}>
        <Grid item={true} xs={6}>
          <TextField
            id="outlined-basic"
            label="Answer"
            variant="outlined"
            value={item.answer}
            fullWidth={true}
            onChange={onAnswerChange}
            disabled={disabled}
            className={classes.root}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ActivityTemplateField
            templateId={item.value}
            onChange={onTemplateChange}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </ListItemLayout>
  )
}
