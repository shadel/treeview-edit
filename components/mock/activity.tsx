import { InstructionCardType, ITaskInstructionCard } from '../poc/taskPackage/cardInstruction/type'
import { ITaskSurvey, SQOptionType, TaskSurveyOptionsType } from '../poc/taskPackage/survey/type'
import { IActivityRecord, ITask, TaskType } from '../poc/type'

function createTask(task: ITaskSurvey | ITaskInstructionCard): ITask {
  return task
}

export const taskRecords: ITask[] = [
  createTask({
    id: `t1`,
    name: `T 1`,
    type: TaskType.InstructionCard,
    properties: {
      instruction: {
        id: '1',
        name: 'instruction',
        type: InstructionCardType.TEXT,
        value: 'Instruction',
      },
    },
  }),
  createTask({
    id: `t2`,
    name: `T 2`,
    type: TaskType.Survey,
    properties: {
      generateActivity: false,
      surveyType: TaskSurveyOptionsType.Normal,
      option: {
        type: SQOptionType.SHORT_ANSWER,
      },
    },
  }),
  createTask({
    id: `t3`,
    name: `T 3`,
    type: TaskType.InstructionCard,
    properties: {
      instruction: {
        id: '1',
        name: 'instruction',
        type: InstructionCardType.TEXT,
        value: 'Instruction',
      },
    },
  }),
  createTask({
    id: `t4`,
    name: `T 4`,
    type: TaskType.Survey,
    properties: {
      generateActivity: false,
      surveyType: TaskSurveyOptionsType.ActivityTemplate,
      option: {
        type: SQOptionType.MULTIPLE_CHECKBOX,
        value: [
          {
            id: '1',
            value: 'a3',
          },
          {
            id: '2',
            value: 'a4',
          },
        ],
      },
    },
  }),
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
