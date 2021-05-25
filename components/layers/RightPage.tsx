import { Card, CardContent, CardHeader } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export function RightPage({ children, title }: PropsWithChildren<{ title: React.ReactNode }>) {
  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
