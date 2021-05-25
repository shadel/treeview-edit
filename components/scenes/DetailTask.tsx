import React from 'react'
import { ISmartData } from '../dnd-tree/type'
import { ITask } from '../poc/type'
import { useSelector } from './context'
import taskPackageF from '../poc/taskPackage'
import { RightPage } from '../layers/RightPage'

function TaskView({ task }: { task: ITask }) {
  const tPack = taskPackageF.get(task.type)
  if (!tPack) {
    return <>Task package {task.type} not available</>
  }
  const View = tPack.view

  return (
    <RightPage title={tPack.name}>
      <View task={task} />
    </RightPage>
  )
}

function DetailTask({ data }: { data: ISmartData }) {
  const task = useSelector((store) => store.tasks.find((task) => task.id === data.data))
  if (!task) {
    return <>Task {data.name} not available</>
  }
  return <TaskView task={task} />
}
export default React.memo(DetailTask)
