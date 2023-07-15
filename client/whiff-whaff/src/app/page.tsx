'use client';
import Image from 'next/image'
import Button from '../components/ui/buttons/authButton'
import IntraButton from '../components/ui/buttons/intraButton'
import PrimaryButton from '@/components/ui/buttons/primaryButton';
import SecondaryButtom from '@/components/ui/buttons/secondaryButton';
import ToggleSwitch from '@/components/ui/buttons/ToggleSwitch';
import { ThemeProvider } from "@material-tailwind/react";

export default function Home() {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center min-h-screen">
      <ThemeProvider>
        <ToggleSwitch
        firstValue='SignIn'
        secondValue='SignUp' />
      </ThemeProvider>
    </div>
    
    </main>
  )
}
