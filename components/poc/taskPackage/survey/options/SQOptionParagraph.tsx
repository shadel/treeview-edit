import { SQOptionType } from '../type'
import { FICreateOptionFunc } from './hepler'

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== SQOptionType.PARAGRAPH) {
    return next(props)
  }

  return {
    type: SQOptionType.PARAGRAPH,
  }
}
