import React from 'react'
import { ISmartData } from '../../dnd-tree/type'
import { ITask, TaskType } from '../type'

export interface IPackage {
  type: TaskType
  name: string
  extractTree: (task: ITask) => ISmartData
  createNew: () => ITask
  view: React.ComponentType<{ task: ITask }>
}
