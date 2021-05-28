import { Card, CardContent, CardHeader } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export function RightPage({
  children,
  title,
  action,
}: PropsWithChildren<{ title: React.ReactNode; action?: React.ReactNode }>) {
  return (
    <Card variant="outlined">
      <CardHeader title={title} action={action} />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
