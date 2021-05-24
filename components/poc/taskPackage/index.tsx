import { TaskPackageFactory } from './factory'
import surveyPackage from './survey'
import ciPackage from './cardInstruction'

const factory = new TaskPackageFactory()

factory.add(surveyPackage)
factory.add(ciPackage)

export default factory
