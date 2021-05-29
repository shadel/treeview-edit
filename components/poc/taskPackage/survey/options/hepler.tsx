import { IStore } from '../../../../app/context'
import { ISmartData, SmartDataType } from '../../../../dnd-tree/type'
import { IActivityRecord } from '../../../type'
import { ITaskSurvey, ITaskSurveyOptions, SDAOptionType, SQOptionType } from '../type'

export type ItemFunc<T, U> = (props: T) => U
export type FactoryItemFunc<T> = (next: T) => T
export const factoryCreator = <T extends unknown>(defaultNext: T) => (
  arrs: Array<FactoryItemFunc<T>>
): T => {
  if (arrs.length === 0) {
    return defaultNext
  }
  const [currentFunc, ...nextArrs] = arrs
  if (nextArrs.length === 0) {
    return currentFunc(defaultNext)
  }
  return currentFunc(factoryCreator(defaultNext)(nextArrs))
}

export type ExtractTreeFunc = ItemFunc<
  { store: IStore; item: ITaskSurvey; node: ISmartData },
  ISmartData[]
>
export type FIExtractTreeFunc = FactoryItemFunc<ExtractTreeFunc>

export function extractTreeFromTemplate(
  store: IStore,
  item: ITaskSurvey,
  node: ISmartData,
  templateId: string,
  nameBuilder: (template: IActivityRecord) => string
) {
  const template = store.activities.find((item) => templateId === item.id)

  return {
    id: `${node.id}.option_${item.id}.${templateId}`,
    data: templateId,
    name: nameBuilder(template),
    type: SmartDataType.ACTIVITY,
    items: [],
    disabled: true,
  }
}

export type CreateOptionFunc = ItemFunc<
  { task: ITaskSurvey; type: SDAOptionType | SQOptionType; templates: IActivityRecord[] },
  ITaskSurveyOptions
>
export type FICreateOptionFunc = FactoryItemFunc<CreateOptionFunc>
