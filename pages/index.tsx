import React from 'react'
import { UserApp } from '../components/app/context'
import UserHome from '../components/scenes/UserHome'

const IndexPage = () => {
  return (
    <UserApp>
      <UserHome />
    </UserApp>
  )
}

export default IndexPage
