import { useRouter } from 'next/router'
import React from 'react'
import EditActivity from '../../components/scenes/EditActivity'

const EditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return <EditActivity id={id as string} />
}

export default EditPage
