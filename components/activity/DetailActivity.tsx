import { TextField } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import { ISmartData } from '../dnd-tree/type'
import { RightPage } from '../layers/RightPage'
import { useDispatch, useSelector } from '../app/context'

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
    <RightPage title={`Activity: ${activity.id}`}>
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
