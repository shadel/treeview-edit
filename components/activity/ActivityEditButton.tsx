import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { IActivityRecord } from '../poc/type'

// eslint-disable-next-line no-empty-pattern
export function ActivityEditButton({ item }: { item: IActivityRecord; disabled?: boolean }) {
  return (
    <Link href={`/edit/${item.id}`}>
      <Button variant="outlined">Edit</Button>
    </Link>
  )
}
