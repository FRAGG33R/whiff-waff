import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
  } from "@material-tailwind/react";
import { IconBellOff } from '@tabler/icons-react';
import { useState } from 'react';
import {motion } from 'framer-motion';
const MuteDropDown = () => {
    const [selected, setSelected] = useState<string| null>(null);

    const selectTime = (option:string) => {
       setSelected(option);
    };
    
  return (
    <div>
        <Menu>
        <MenuHandler >
        <motion.div
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
         >
            <IconBellOff />
        </motion.div>
        </MenuHandler>
        <MenuList className='bg-HokiCl border-0 '>
            <MenuItem className="flex items-centre justify-center gap-2 "
                onClick={() => selectTime("1 hour")}>
            <Typography  className="font-teko text-2xl text-Mercury ">
                1 hour
            </Typography>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-2 "
                    onClick={()=> selectTime("8 hour")} >
            <Typography  className="font-teko text-2xl text-Mercury">
                8 hours
            </Typography>
            </MenuItem>
            <MenuItem className="flex items-center justify-center gap-2"
                        onClick={()=> selectTime("always")}>   
            <Typography  className="font-teko text-2xl text-Mercury">
                Always
            </Typography>
            </MenuItem>
        </MenuList>
        </Menu>
    </div>
  );
}
export default MuteDropDown