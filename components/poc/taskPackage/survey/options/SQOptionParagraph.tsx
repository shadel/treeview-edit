import { SQOptionType } from '../type'
import { FICreateOptionFunc } from './hepler'

const OPTION_TYPE = SQOptionType.PARAGRAPH

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== OPTION_TYPE) {
    return next(props)
  }

  return {
    type: OPTION_TYPE,
  }
}
