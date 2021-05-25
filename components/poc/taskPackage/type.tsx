import React from 'react'
import { ISmartData } from '../../dnd-tree/type'
import { IStore } from '../../scenes/context'
import { ITask, TaskType } from '../type'

export interface IPackage {
  type: TaskType
  name: string
  queryChilds: (store: IStore, task: ITask, node: ISmartData) => ISmartData[]
  createNew: () => ITask
  view: React.ComponentType<{ task: ITask; disabled?: boolean }>
}
