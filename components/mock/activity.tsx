import { IActivity, TaskSurveyOptionsType, TaskType } from '../poc/type'

export const activity: IActivity = {
  id: `a1`,
  name: 'A 1',
  items: [
    {
      id: `t1`,
      name: `T 1`,
      type: TaskType.instructionCard,
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
                  type: TaskType.instructionCard,
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
