import { SQOptionType } from '../type'
import { FICreateOptionFunc } from './hepler'

export const createNew: FICreateOptionFunc = (next) => (props) => {
  const { type } = props
  if (type !== SQOptionType.DROPDOWN) {
    return next(props)
  }

  return {
    type: SQOptionType.DROPDOWN,
    value: [
      {
        id: `${new Date().getTime()}`,
        value: `Answer 1`,
      },
    ],
  }
}
