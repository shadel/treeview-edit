import { TextField } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import { ISmartData } from '../dnd-tree/type'
import { RightPage } from '../layers/RightPage'
import { useDispatch, useSelector } from '../app/context'
import { EditorMode, useEditorMode } from './ActivityContext'
import { IActivityRecord } from '../poc/type'
import { ActivitySaveButton } from './ActivitySaveButton'
import { ActivityRemoveButton } from './ActivityRemoveButton'
import { ActivityCancelButton } from './ActivityCancelButton'
import { ActivityEditButton } from './ActivityEditButton'

function ActionButton(props: { item: IActivityRecord; disabled?: boolean }) {
  const mode = useEditorMode()

  return (
    <>
      {[EditorMode.VIEW].includes(mode) && <ActivityEditButton {...props} />}
      {[EditorMode.CREATE].includes(mode) && <ActivitySaveButton {...props} />}
      {[EditorMode.EDIT].includes(mode) && <ActivityRemoveButton {...props} />}
      {[EditorMode.CREATE].includes(mode) && <ActivityCancelButton {...props} />}
    </>
  )
}

function DetailActivity({ data }: { data: ISmartData }) {
  const dispatch = useDispatch()
  const activity = useSelector((store) => store.activities.find((item) => item.id === data.data))

  const onNameChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = React.useCallback(
    (event) => {
      dispatch({
        type: `update_activity`,
        payload: {
          data: { ...activity, name: event.target.value },
        },
      })
    },
    [activity, dispatch]
  )
  return (
    <RightPage
      title={`Activity: ${activity.id}`}
      action={<ActionButton item={activity} disabled={data.disabled} />}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={activity.name}
        fullWidth={true}
        onChange={onNameChange}
        disabled={data.disabled}
      />
    </RightPage>
  )
}
export default DetailActivity
