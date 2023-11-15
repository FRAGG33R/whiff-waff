import React from "react";
import { Fragment } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { Badge as MaterialUIBadge } from "@mui/material";
import { ClockIcon } from "@heroicons/react/24/outline";
import chatIcon from "../../../../public/chatNotification.svg";
import { NotificationProps } from "../../../types/dropDownType";
import { motion } from "framer-motion";
import Image from "next/image";

const MessageDropDown: React.FC<NotificationProps> = (props) => {
  const { notifications, content } = props;
  const updateMessage = (message: string) => {
    if (message.length > 20) {
      return message.substring(0, 20) + "...";
    }
    return message;
  };
  return (
    <Fragment>
      <div className="flex min-w-1 h-full items-center justify-center rounded-lg ">
        <Menu placement="bottom">
          <motion.div className="flex items-center justify-center">
            <MaterialUIBadge  color="error" badgeContent={content}>
              <MenuHandler>
                <motion.button whileTap={{scale : 0.9}} whileHover={{ scale : 1.1}} className="bg-[#606060]/[12%] w-10 h-10 sm:w-12 sm:h-12 md:h-14 md:w-14 xl:w-16 xl:h-16 flex items-center justify-center rounded-[12px] md:rounded-[20px]">
                  <Image
                    src={chatIcon}
                    alt="chat notification icon"
					className="w-5 sm:w-6 md:w-8"
                  />
                </motion.button>
              </MenuHandler>
            </MaterialUIBadge>
          </motion.div>
          <MenuList className="flex flex-col bg-HokiCl border-0 ">
            <p className="flex items-center justify-center text-Mercury font-teko text-2xl ">
              Message
            </p>
            {notifications &&
              notifications.length > 0 &&
              notifications.map((notification, index) => (
                <MenuItem
                  key={index}
                  className=" flex items-center gap-4 py-2 pr-8 pl-2  focus:bg-[#D2386D] "
                >
                  <Avatar
                    className="border-4 border-DeepRose rounded-2xl"
                    variant="rounded"
                    alt={notification.name}
                    src={notification.avatar}
                  />
                  <div className="flex flex-col gap-1 -space-y-1 ">
                    <Typography className="gab-3 font-poppins  flex flex-col  -space-y-1">
                      <span className="font-teko font-semibold text-lg text-Mercury ">
                        {notification.name}
                      </span>
                      <span className="font-poppins text-Mercury flex items-center justify-center">
                        {updateMessage(notification.message)}
                      </span>
                    </Typography>
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 text-xs font-bold text-GreenishYellow"
                    >
                      <ClockIcon className="h-3 w-3 " />
                      {notification.time}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </div>
    </Fragment>
  );
};

export default MessageDropDown;
