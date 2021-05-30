import { useCallback } from 'react'
import { useDispatch } from '../../../../app/context'
import { updateTask } from '../../../../app/reducer'
import { ISQCheckbox, ISQOptionDropDown, SQOptionType } from '../type'
import { FICreateOptionFunc, FIOptionComponentFunc, OptionProps } from './hepler'
import { SQCheckbox } from './SQCheckbox'

const OPTION_TYPE = SQOptionType.DROPDOWN

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== OPTION_TYPE) {
    return next(props)
  }

  return {
    type: OPTION_TYPE,
    value: [
      {
        id: `${new Date().getTime()}`,
        value: `Answer 1`,
      },
    ],
  }
}

function Component({ task, ...props }: OptionProps) {
  const option = task.properties.option as ISQOptionDropDown

  const list = option.value

  const dispatch = useDispatch()
  const onChange = useCallback(
    (func: (items: ISQCheckbox[]) => ISQCheckbox[]) => {
      dispatch(
        updateTask({
          ...task,
          properties: {
            ...task.properties,
            option: {
              ...task.properties.option,
              value: func(list),
            },
          },
        })
      )
    },
    [dispatch, task, list]
  )

  const newItem = useCallback(
    (list: ISQCheckbox[]) => ({
      id: `${new Date().getTime()}`,
      value: `Answer ${list.length + 1}`,
    }),
    []
  )

  return (
    <>
      {list.map((item, idx) => (
        <SQCheckbox
          item={item}
          onChange={onChange}
          disabled={props.disabled}
          key={item.id}
          classes={{ root: '', formControl: props.formControl }}
          canAdd={idx === list.length - 1}
          canRemove={list.length > 1}
          newItem={newItem}
        />
      ))}
    </>
  )
}

export const OptionComponent: FIOptionComponentFunc = (Next) => {
  return function OptionComponent(props) {
    const { task } = props
    if (task.properties.option.type !== OPTION_TYPE) {
      return <Next {...props} />
    }
    return <Component {...props} />
  }
}
