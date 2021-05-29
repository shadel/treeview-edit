import { SDAOptionType } from '../type'
import { FIExtractTreeFunc, extractTreeFromTemplate, FICreateOptionFunc } from './hepler'

export const extracTree: FIExtractTreeFunc = (next) => ({ store, item, node }) => {
  const option = item.properties.option
  if (option.type !== SDAOptionType.MULTIPLE_CHOICE) {
    return next({ store, item, node })
  }
  return option.value.map((choice) =>
    extractTreeFromTemplate(
      store,
      item,
      node,
      choice.value,
      (template) => `${choice.answer} ~ ${template.name}`
    )
  )
}

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type, templates } = props
  if (type !== SDAOptionType.MULTIPLE_CHOICE) {
    return next(props)
  }

  return {
    type: SDAOptionType.MULTIPLE_CHOICE,
    value: [
      {
        id: `${new Date().getTime()}`,
        answer: `Answer 1`,
        value: templates[0].id,
      },
    ],
  }
}
