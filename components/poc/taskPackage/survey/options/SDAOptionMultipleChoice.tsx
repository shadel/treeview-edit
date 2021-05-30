import { useCallback } from 'react'
import { useDispatch } from '../../../../app/context'
import { updateTask } from '../../../../app/reducer'
import { useActivityTemplaties } from '../hepler'
import { ISDAChoice, ISDAOptionMultipleChoice, SDAOptionType } from '../type'
import {
  FIExtractTreeFunc,
  extractTreeFromTemplate,
  FICreateOptionFunc,
  FIOptionComponentFunc,
  OptionProps,
} from './hepler'
import { SDAChoice } from './SDAChoice'

const OPTION_TYPE = SDAOptionType.MULTIPLE_CHOICE

export const extracTree: FIExtractTreeFunc = (next) => ({ store, item, node }) => {
  const option = item.properties.option
  if (option.type !== OPTION_TYPE) {
    return next({ store, item, node })
  }
  return option.value.map((choice) =>
    extractTreeFromTemplate(
      store,
      item,
      node,
      choice.value,
      (template) => `${choice.answer} ~ ${template.name}`,
      () => `${node.id}.option_${item.id}.${choice.id}.${choice.value}`
    )
  )
}

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type, templates } = props
  if (type !== OPTION_TYPE) {
    return next(props)
  }

  return {
    type: OPTION_TYPE,
    value: [
      {
        id: `${new Date().getTime()}`,
        answer: `Answer 1`,
        value: templates[0].id,
      },
    ],
  }
}

function Component({ task, ...props }: OptionProps) {
  const templates = useActivityTemplaties()
  const option = task.properties.option as ISDAOptionMultipleChoice

  const list = option.value

  const dispatch = useDispatch()
  const onChange = useCallback(
    (func: (items: ISDAChoice[]) => ISDAChoice[]) => {
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
    (list: ISDAChoice[]) => ({
      id: `${new Date().getTime()}`,
      answer: `Answer ${list.length + 1}`,
      value: templates[0].id,
    }),
    [templates]
  )

  return (
    <>
      {list.map((item, idx) => (
        <SDAChoice
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
