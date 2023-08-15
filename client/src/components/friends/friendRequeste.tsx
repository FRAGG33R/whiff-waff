import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import FriendRequest from './Requestepage'
import { Pagination } from '../ui/pagination/pagination'
const friendRequeste = () => {
  
  const [active, setActive] = useState(1);
  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className='w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10'>
        <FriendRequest />
        <FriendRequest  />
        <FriendRequest  />
        <FriendRequest  />
        <FriendRequest  />
        <FriendRequest />
        <FriendRequest  />
        <Pagination max={60} active={active} setActive={setActive}/>

      </div>
      </div>

  )
}

export default friendRequeste