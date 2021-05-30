import { factoryCreator, OptionComponentFunc } from './hepler'
import { OptionComponent as SDAOptionBoolean } from './SDAOptionBoolean'
import { OptionComponent as SDAOptionRepeat } from './SDAOptionRepeat'
import { OptionComponent as SDAOptionCheckbox } from './SDAOptionCheckbox'
import { OptionComponent as SDAOptionMultipleChoice } from './SDAOptionMultipleChoice'
import { OptionComponent as SQOptionDropDown } from './SQOptionDropDown'
import { OptionComponent as SQOptionMultipleCheckbox } from './SQOptionMultipleCheckbox'

const defaultNext = () => <></>
export const factory = factoryCreator<OptionComponentFunc>(defaultNext)

export const optionExtracts = [
  SDAOptionBoolean,
  SDAOptionRepeat,
  SDAOptionCheckbox,
  SDAOptionMultipleChoice,
  SQOptionDropDown,
  SQOptionMultipleCheckbox,
]

export const OptionComponent = factory(optionExtracts)
