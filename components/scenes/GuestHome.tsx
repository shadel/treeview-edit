import React from 'react'
import { BtnSignin } from '../buttons/auth/BtnSignin'
import { Button } from '../buttons/Button'
import LayoutContainer from '../layers/Container'
import ModelDialog from '../modals/Model'

function GuestHome() {
  return (
    <LayoutContainer>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Online Ebook Viewer</span>
        <span className="block text-indigo-600 xl:inline">*.PRC, *.Mobi, *.EPUB and more</span>
      </h1>
      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        Upload, Store and read ebook quickly
      </p>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <Button isPrimary={true}>Upload</Button>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <BtnSignin />
        </div>
      </div>
      <ModelDialog />
    </LayoutContainer>
  )
}

export default GuestHome
