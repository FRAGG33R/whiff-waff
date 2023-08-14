import React from 'react'

import { useState } from 'react'
import Image from 'next/image'
import FriendGame from './firendGame'
import { Pagination } from '../ui/pagination/pagination'
const friendsComponent = () => {
  

    const [active, setActive] = useState(1);
    return (
      <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
        <div className='w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10'>
          <FriendGame />
          <FriendGame  />
          <FriendGame  />
          <FriendGame  />
          <FriendGame  />
          <FriendGame />
          <Pagination max={60} active={active} setActive={setActive}/>

        </div>
        </div>

    )
  }

export default friendsComponent