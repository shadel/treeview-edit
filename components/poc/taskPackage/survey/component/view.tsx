import { ITask } from '../../../type'

function View({ task }: { task: ITask }) {
  return <>{task.name}</>
}

export default View
