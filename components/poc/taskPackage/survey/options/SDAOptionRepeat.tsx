import { SDAOptionType } from '../type'
import { FIExtractTreeFunc, extractTreeFromTemplate, FICreateOptionFunc } from './hepler'

export const extracTree: FIExtractTreeFunc = (next) => ({ store, item, node }) => {
  const option = item.properties.option
  if (option.type !== SDAOptionType.REPEAT) {
    return next({ store, item, node })
  }
  const templateId = option.value

  return [
    extractTreeFromTemplate(
      store,
      item,
      node,
      templateId,
      (template) => `Repeat ~ ${template.name}`
    ),
  ]
}

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type, templates } = props
  if (type !== SDAOptionType.REPEAT) {
    return next(props)
  }
  return {
    type: SDAOptionType.REPEAT,
    value: templates[0].id,
  }
}
