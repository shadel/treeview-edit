import { SQOptionType } from '../type'
import { FICreateOptionFunc } from './hepler'

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== SQOptionType.MULTIPLE_CHECKBOX) {
    return next(props)
  }

  return {
    type: SQOptionType.MULTIPLE_CHECKBOX,
    value: [
      {
        id: `${new Date().getTime()}`,
        value: `Answer 1`,
      },
    ],
  }
}
