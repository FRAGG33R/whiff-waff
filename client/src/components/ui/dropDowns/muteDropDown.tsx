import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
  } from "@material-tailwind/react";
import { IconBellOff } from '@tabler/icons-react';

const MuteDropDown = () => {
  return (
    <div>
    <Menu>
      <MenuHandler >
        <IconBellOff />
      </MenuHandler>
      <MenuList className='bg-HokiCl border-0'>
        <MenuItem className="flex items-centre justify-center gap-2">
          <Typography  className="font-teko text-2xl text-Mercury">
            1 hour
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center justify-center gap-2">
          <Typography  className="font-teko text-2xl text-Mercury">
            8 hours
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center justify-center gap-2">   
          <Typography  className="font-teko text-2xl text-Mercury">
            Always
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
    </div>
  )
}

export default MuteDropDown