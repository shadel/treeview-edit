import { TaskType } from '../type'
import { IPackage } from './type'

export class TaskPackageFactory {
  private packages: IPackage[]
  constructor() {
    this.packages = []
  }

  public add(tPackage: IPackage) {
    this.packages = [tPackage, ...this.packages.filter(({ type }) => type !== tPackage.type)]
  }

  public get(type: TaskType) {
    return this.packages.find((item) => item.type === type)
  }

  public list() {
    return this.packages
  }
}
