'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";
import LevelBar from "@/components/ui/progressBar/levelBar";
import { ThemeProvider } from "@material-tailwind/react";

export default function Login() {
 
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ThemeProvider >
          <LevelBar level={8} progress={80} />     
        </ThemeProvider>
    </div>
  );
}
