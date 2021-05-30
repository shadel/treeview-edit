import { useCallback } from 'react'
import { useDispatch } from '../../../../app/context'
import { updateTask } from '../../../../app/reducer'
import { ActivityTemplateField } from '../component/ActivityTemplateField'
import { ISDAOptionBoolean, SDAOptionType } from '../type'
import {
  FIExtractTreeFunc,
  extractTreeFromTemplate,
  FICreateOptionFunc,
  OptionProps,
  FIOptionComponentFunc,
} from './hepler'

const OPTION_TYPE = SDAOptionType.BOOLEAN

export const extracTree: FIExtractTreeFunc = (next) => ({ store, item, node }) => {
  const option = item.properties.option
  if (option.type !== OPTION_TYPE) {
    return next({ store, item, node })
  }
  const templateId = option.value

  return [
    extractTreeFromTemplate(
      store,
      item,
      node,
      templateId,
      (template) => `Boolean ~ ${template.name}`
    ),
  ]
}

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type, templates } = props
  if (type !== OPTION_TYPE) {
    return next(props)
  }
  return {
    type: OPTION_TYPE,
    value: templates[0].id,
  }
}

function Component({ task, ...props }: OptionProps) {
  const option = task.properties.option as ISDAOptionBoolean

  const dispatch = useDispatch()
  const onChange = useCallback(
    (id: string) => {
      dispatch(
        updateTask({
          ...task,
          properties: {
            ...task.properties,
            option: {
              ...task.properties.option,
              value: id,
            },
          },
        })
      )
    },
    [dispatch, task]
  )

  return <ActivityTemplateField templateId={option.value} onChange={onChange} {...props} />
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
