'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";
import LevelBar from "@/components/ui/progressBar/levelBar";
import { ThemeProvider } from "@material-tailwind/react";
import AchievementsProgressBar from "@/components/ui/progressBar/achievementsProgressBar";
import ProfilDropDown from "@/components/ui/dropDowns/profilDropDown";
import UserChannelDropDown from "@/components/ui/dropDowns/userChannelDropDown";
import ToggleSwitch from "@/components/ui/buttons/ToggleSwitch";
import MuteDropDown from "@/components/ui/dropDowns/muteDropDown";

export default function Login() {
 
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ThemeProvider >
          <ToggleSwitch
            firstValue="Sign In"
            secondValue="Sign Up"
            firstFunction={() => console.log("Sign In")}
            secondFunction={() => console.log("Sign Up")}
          />     
        </ThemeProvider>
    </div>
  );
}
