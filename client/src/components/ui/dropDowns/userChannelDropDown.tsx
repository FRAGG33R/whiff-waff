import React from 'react'

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
  } from "@material-tailwind/react";
import { useState } from 'react';
import {motion } from 'framer-motion';
import { IconBan } from '@tabler/icons-react';
const UserChannelDropDown = () => {
    const [selected, setSelected] = useState<string| null>(null);

    const OptionClick = (option:string) => {
       setSelected(option);
    };
    
  return (
        <Menu>
        <MenuHandler >
        <motion.div
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_567_567)">
                <path d="M15 11L12 14L9 11" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3Z" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_567_567">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>

        </motion.div>
        </MenuHandler>
        <MenuList className='bg-HokiCl border-0 '>
            <MenuItem className="flex space-x-2  gap-2 "
                onClick={() => OptionClick("1 hour")}>
                    <IconBan className='text-Mercury'/>
            <Typography  className="flex  font-teko text-2xl text-Mercury ">
                Ban
            </Typography>
            </MenuItem>
            <MenuItem className="flex space-x-2 gap-2 "
                    onClick={()=> OptionClick("8 hour")} >
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_567_579)">
                        <path d="M14.0834 13V13.0117" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.25 22.75H22.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.41663 22.75V5.41667C5.41663 4.84203 5.6449 4.29093 6.05123 3.8846C6.45756 3.47827 7.00866 3.25 7.58329 3.25H15.7083M18.4166 14.625V22.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.1666 7.58325H22.75M22.75 7.58325L19.5 4.33325M22.75 7.58325L19.5 10.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_567_579">
                        <rect width="26" height="26" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

            <Typography  className="flex font-teko text-2xl text-Mercury">
                Kick
            </Typography>
            </MenuItem>
            <MenuItem className="flex space-x-2  items-end gap-2"
                        onClick={()=> OptionClick("always")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_567_599)">
                            <path d="M12 2L16 8L21 4L19 14H5L3 4L8 8L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_567_599">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
   
            <Typography  className="font-teko text-2xl text-Mercury">
                As Admin
            </Typography>
            </MenuItem>
        </MenuList>
        </Menu>
  );
}
export default UserChannelDropDown