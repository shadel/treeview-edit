import { ISmartData, SmartDataType } from '../dnd-tree/type'

export const datum: ISmartData[] = [
  {
    id: '1',
    type: SmartDataType.ACTIVITY,
    items: [
      {
        id: `1.1`,
        items: [],
        type: SmartDataType.TASK,
        name: `Task 1.1`,
      },
    ],
    name: `Activity 1`,
  },

  {
    id: '2',
    type: SmartDataType.ACTIVITY,
    items: [
      {
        id: `2.1`,
        items: [],
        type: SmartDataType.TASK,
        name: `Task 2.1`,
      },

      {
        id: `2.2`,
        type: SmartDataType.TASK,
        items: [
          {
            id: `2.2.1`,
            items: [],
            type: SmartDataType.ACTIVITY,
            name: `DATA 2.2.1`,
          },
        ],
        name: `Task 2.2`,
      },
    ],
    name: `Activity 2`,
  },
]
