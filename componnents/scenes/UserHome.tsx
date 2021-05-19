import Head from 'next/head'
import React from 'react'
import LayoutContainer from '../layers/Container'

function UserHome() {
  return (
    <LayoutContainer>
      <div className="hero">
        <Head>
          <title>Index Page</title>
        </Head>
        <div className="text">Hello world</div>
      </div>
    </LayoutContainer>
  )
}

export default UserHome
