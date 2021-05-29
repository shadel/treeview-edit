import { ExtractTreeFunc, factoryCreator } from './hepler'
import { extracTree as SDAOptionCheckbox } from './SDAOptionCheckbox'
import { extracTree as SDAOptionBoolean } from './SDAOptionBoolean'
import { extracTree as SDAOptionMultipleChoice } from './SDAOptionMultipleChoice'
import { extracTree as SDAOptionRepeat } from './SDAOptionRepeat'

const defaultNext: ExtractTreeFunc = () => []
export const factory = factoryCreator(defaultNext)

export const optionExtracts = [
  SDAOptionCheckbox,
  SDAOptionBoolean,
  SDAOptionMultipleChoice,
  SDAOptionRepeat,
]

export const extractTree = factory(optionExtracts)
