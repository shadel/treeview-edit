import React from 'react'
import { UserApp } from '../components/app/context'
import Home from '../components/scenes/Home'

const IndexPage = () => {
  return (
    <UserApp>
      <Home />
    </UserApp>
  )
}

export default IndexPage
