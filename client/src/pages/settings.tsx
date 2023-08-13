import '../app/globals.css'

import React, { useEffect } from 'react'
import SettingPage from '@/components/settings/settingPage'
import { useRouter} from "next/router";

export default function Settings () {

  const router = useRouter();
  useEffect(() => {
    const isLogin = localStorage.getItem('token') 
    if (!isLogin){
      router.push('/login')
    }
  }, [router])
  return (
    <div className='flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet'>
       
        <SettingPage />
    </div>
  )
}
