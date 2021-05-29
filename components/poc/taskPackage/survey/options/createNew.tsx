import { CreateOptionFunc, factoryCreator } from './hepler'
import { createNew as SDAOptionCheckbox } from './SDAOptionCheckbox'
import { createNew as SDAOptionBoolean } from './SDAOptionBoolean'
import { createNew as SDAOptionMultipleChoice } from './SDAOptionMultipleChoice'
import { createNew as SDAOptionRepeat } from './SDAOptionRepeat'
import { createNew as SQOptionDate } from './SQOptionDate'
import { createNew as SQOptionDropDown } from './SQOptionDropDown'
import { createNew as SQOptionMultipleCheckbox } from './SQOptionMultipleCheckbox'
import { createNew as SQOptionParagraph } from './SQOptionParagraph'
import { createNew as SQOptionShortAnswer } from './SQOptionShortAnswer'
import { SQOptionType } from '../type'

const defaultNext: CreateOptionFunc = () => ({ type: SQOptionType.SHORT_ANSWER })
export const factory = factoryCreator(defaultNext)

export const optionExtracts = [
  SDAOptionCheckbox,
  SDAOptionBoolean,
  SDAOptionMultipleChoice,
  SDAOptionRepeat,
  SQOptionDate,
  SQOptionDropDown,
  SQOptionMultipleCheckbox,
  SQOptionParagraph,
  SQOptionShortAnswer,
]

export const createNew = factory(optionExtracts)
