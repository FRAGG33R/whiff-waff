'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";
import LevelBar from "@/components/ui/progressBar/levelBar";
import { ThemeProvider } from "@material-tailwind/react";
import AchievementsProgressBar from "@/components/ui/progressBar/achievementsProgressBar";

export default function Login() {
 
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ThemeProvider >
          <AchievementsProgressBar achievmentprogress={65} />     
        </ThemeProvider>
    </div>
  );
}
