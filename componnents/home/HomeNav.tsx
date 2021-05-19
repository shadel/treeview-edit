import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { HomeMenu } from './HomeMenu'
import { HomeMenuMobileOpen } from './HomeMenuMobileOpen'

export function HomeNav() {
  const [openMenuFlg, setOpenMenuFlg] = useState(false)
  const openMenu = () => setOpenMenuFlg(true)
  const closeMenu = () => setOpenMenuFlg(false)
  return (
    <React.Fragment>
      <HomeMenu onOpen={openMenu} />
      <Transition
        show={openMenuFlg}
        enter="ease-out duration-150 "
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave=" ease-in duration-100 "
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <HomeMenuMobileOpen onClose={closeMenu} />
        </div>
      </Transition>
    </React.Fragment>
  )
}
