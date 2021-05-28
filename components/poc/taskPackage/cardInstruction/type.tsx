import { ITask } from '../../type'

export enum InstructionCardType {
  IMAGE,
  VIDEO,
  TEXT,
}

export interface IInstructionInfo {
  id: string
  name: string
  type: InstructionCardType
  value: string
}

export const InstructionTypeList: IInstructionInfo[] = [
  {
    id: '1',
    name: 'Sample Text',
    type: InstructionCardType.TEXT,
    value: `This is sample instruction`,
  },
  {
    id: '2',
    name: 'Sample Image',
    type: InstructionCardType.IMAGE,
    value: `https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg`,
  },
  {
    id: '3',
    name: 'Sample Video',
    type: InstructionCardType.VIDEO,
    value: `https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4`,
  },
  {
    id: '4',
    name: 'Sample Text 2',
    type: InstructionCardType.TEXT,
    value: `This is sample instruction 2`,
  },
  {
    id: '5',
    name: 'Sample Image 2',
    type: InstructionCardType.IMAGE,
    value: `https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg`,
  },
  {
    id: '6',
    name: 'Sample Video 2',
    type: InstructionCardType.VIDEO,
    value: `https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4`,
  },
]

export interface ITaskInstructionCard extends ITask {
  properties: {
    instruction: IInstructionInfo
  }
}
