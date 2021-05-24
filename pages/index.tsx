import React from 'react'
import { UserApp } from '../components/scenes/context'
import UserHome from '../components/scenes/UserHome'

const IndexPage = () => {
  return (
    <UserApp>
      <UserHome />
    </UserApp>
  )
}

export default IndexPage
