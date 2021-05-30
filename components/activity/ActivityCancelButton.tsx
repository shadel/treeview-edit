import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { IActivityRecord } from '../poc/type'

// eslint-disable-next-line no-empty-pattern
export function ActivityCancelButton({}: { item: IActivityRecord; disabled?: boolean }) {
  return (
    <Link href="/">
      <Button variant="outlined">Cancel</Button>
    </Link>
  )
}
