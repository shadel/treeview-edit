import React, { PropsWithChildren } from 'react'
import { RightPage } from '../../layers/RightPage'
import { ITask } from '../type'
import taskPackageF from '../taskPackage'
import { IPackage } from '../taskPackage/type'
import { TaskNameField } from './TaskNameField'
import { TaskRemoveButton } from './TaskRemoveButton'

export type IProps = PropsWithChildren<{ task: ITask; disabled?: boolean }>

function TaskLayout({ task, tPack, children, disabled }: IProps & { tPack: IPackage }) {
  return (
    <RightPage
      title={tPack.name}
      action={
        <>
          <TaskRemoveButton task={task} disabled={disabled} />
        </>
      }
    >
      <TaskNameField task={task} disabled={disabled} />
      {children}
    </RightPage>
  )
}

export function TaskLayoutWraper({ task, ...props }: IProps) {
  const tPack = taskPackageF.get(task.type)
  if (!tPack) {
    return <>Task package {task.type} not available</>
  }
  return <TaskLayout {...{ task, tPack, ...props }} />
}
