import { SDAOptionType } from '../type'
import { FIExtractTreeFunc, extractTreeFromTemplate, FICreateOptionFunc } from './hepler'

export const extracTree: FIExtractTreeFunc = (next) => ({ store, item, node }) => {
  const option = item.properties.option
  if (option.type !== SDAOptionType.BOOLEAN) {
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
  if (type !== SDAOptionType.BOOLEAN) {
    return next(props)
  }
  return {
    type: SDAOptionType.BOOLEAN,
    value: templates[0].id,
  }
}
