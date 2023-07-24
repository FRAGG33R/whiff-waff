'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";
import LevelBar from "@/components/ui/progressBar/levelBar";
import { ThemeProvider } from "@material-tailwind/react";
import AchievementsProgressBar from "@/components/ui/progressBar/achievementsProgressBar";
import ProfilDropDown from "@/components/ui/dropDowns/profilDropDown";
import UserChannelDropDown from "@/components/ui/dropDowns/userChannelDropDown";
import LoginToggleSwitch from "@/components/ui/buttons/loginToggleSwitch";
import MuteDropDown from "@/components/ui/dropDowns/muteDropDown";
import ChannelToggleSwitch from "@/components/ui/buttons/channelToggleSwitch";
import NotificationDropDown from "@/components/ui/dropDowns/notificationDropDown";
import {theme }  from '../Them/userTheme'
export default function Login() {

  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ThemeProvider value={theme}>
          
        </ThemeProvider>
    </div>
  );
}
