import { ISmartData } from '../dnd-tree/type'

function DetailActivity({ data }: { data: ISmartData }) {
  return <>Activity: {data.name}</>
}
export default DetailActivity
