import '../app/globals.css'

import React from 'react'
import SettingPage from '@/components/settings/settingPage'

export default function Settings () {
  return (
    <div className='flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet'>
       
        <SettingPage />
    </div>
  )
}
