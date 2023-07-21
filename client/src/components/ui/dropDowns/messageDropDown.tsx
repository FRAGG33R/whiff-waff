import React from 'react'
import { Fragment } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Avatar,
    Typography,
    Badge,
} from "@material-tailwind/react"
import { ClockIcon } from "@heroicons/react/24/outline";
import { IconBell } from '@tabler/icons-react'; 
import { NotificationProps} from '../../../types/dropDownType';
const MessageDropDown: React.FC<NotificationProps> = (props) => {
  const {notifications, content } = props;

  const updateMessage = (message :string) => {
    if (message.length > 20) {
      return message.substring(0, 20) + '...';
    }
    return message;
  }
  return (
    <Fragment>
    <div className='flex mb-5 gap-5  bg-CarbonGrey bg-opacity-10 rounded-lg '>
         <Menu placement="bottom" >
             <Badge content={content} >
             <MenuHandler >
                 <IconButton variant="text">
                     <IconBell className="h-5 w-5 text-Ceramic " />
                 </IconButton>
             </MenuHandler>
                 </Badge>
             <MenuList className="flex flex-col  bg-HokiCl border-0 "  >
                   <p className='flex items-center justify-center text-Mercury font-teko text-2xl'>Message</p>
                     {notifications && notifications.length > 0 && notifications.map((notification, index) => (
                        <MenuItem key={index} className=" flex items-center gap-4 py-2 pr-8 pl-2  ">
                           <Avatar
                             className='border-4  border-DeepRose rounded-2xl'
                             variant="rounded" alt={notification.name} src={notification.src} />
                          <div className="flex flex-col gap-1 -space-y-1 ">
                            <Typography  className="gab-3 font-poppins  flex flex-col  -space-y-1">
                              <span className="font-teko font-semibold text-lg text-Mercury ">{notification.name}</span> 
                              <span className='font-poppins text-Mercury flex items-center justify-center'>{updateMessage(notification.message)}</span>
                            </Typography>
                            <Typography variant="small" className="flex items-center gap-1 text-xs font-bold text-GreenishYellow">
                              <ClockIcon className="h-3 w-3 " />
                              {notification.time}
                            </Typography>
                          </div >
                            <div className="ml-auto">
                              <Badge content={content} />
                            </div>
                        </MenuItem>
                     ))}
                 </MenuList>
         </Menu>
     </div> 
 </Fragment>
  )
}

export default MessageDropDown