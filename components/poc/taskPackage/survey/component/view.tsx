import { ITask } from '../../../type'

function View({ task }: { task: ITask }) {
  return <>Hahaha {task.name}</>
}

export default View
