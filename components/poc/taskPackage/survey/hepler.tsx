import { useCallback } from 'react'
import { useActivityId } from '../../../scenes/ActivityContext'
import { IStore, useSelector } from '../../../scenes/context'

export function useActivityTemplaties() {
  const activityId = useActivityId()
  const actvitiesSelector = useCallback(
    (store: IStore) => store.activities.filter((item) => item.id !== activityId),
    [activityId]
  )
  const activityTemplaties = useSelector(actvitiesSelector)

  return activityTemplaties
}
