import { SQOptionType } from '../type'
import { FICreateOptionFunc } from './hepler'

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== SQOptionType.DATE) {
    return next(props)
  }

  return {
    type: SQOptionType.DATE,
  }
}
