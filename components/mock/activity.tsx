import { TaskSurveyOptionsType } from '../poc/taskPackage/survey/type'
import { IActivity, IActivityRecord, TaskType } from '../poc/type'

export const activity: IActivity = {
  id: `a1`,
  name: 'A 1',
  items: [
    {
      id: `t1`,
      name: `T 1`,
      type: TaskType.InstructionCard,
      properties: {},
    },
    {
      id: `t2`,
      name: `T 2`,
      type: TaskType.Survey,
      properties: {
        options: [
          {
            id: `o1`,
            type: TaskSurveyOptionsType.ActivityTemplate,
            value: {
              id: `a2`,
              name: 'A 2',
              items: [
                {
                  id: `a2t1`,
                  name: `T 1`,
                  type: TaskType.InstructionCard,
                },
              ],
            },
          },
        ],
      },
    },
  ],
}

export const taskRecords = [
  {
    id: `t1`,
    name: `T 1`,
    type: TaskType.InstructionCard,
    properties: {},
  },
  {
    id: `t2`,
    name: `T 2`,
    type: TaskType.Survey,
    properties: {
      options: [
        {
          id: `o1`,
          type: TaskSurveyOptionsType.ActivityTemplate,
          value: {
            id: `a2`,
            name: 'A 2',
            items: [
              {
                id: `a2t1`,
                name: `T 1`,
                type: TaskType.InstructionCard,
              },
            ],
          },
        },
      ],
    },
  },
]

export const activityRecords: IActivityRecord[] = [
  {
    id: `a1`,
    name: 'A 1',
    items: [`t1`, `t2`],
  },
]
