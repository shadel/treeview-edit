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
          value: '{"name":"Option 1","template":"a2"}',
        },
      ],
    },
  },
  {
    id: `t3`,
    name: `T 3`,
    type: TaskType.InstructionCard,
    properties: {},
  },
  {
    id: `t4`,
    name: `T 4`,
    type: TaskType.Survey,
    properties: {
      options: [
        {
          id: `o1`,
          type: TaskSurveyOptionsType.ActivityTemplate,
          value: '{"name":"Option 1","template":"a3"}',
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
  {
    id: `a2`,
    name: 'A 2',
    items: [`t3`, `t4`],
  },
  {
    id: `a3`,
    name: 'A 3',
    items: [`t5`, `t6`],
  },
  {
    id: `a4`,
    name: 'A 4',
    items: [`t7`, `t8`],
  },
  {
    id: `a5`,
    name: 'A 5',
    items: [`t9`, `t10`],
  },
]
