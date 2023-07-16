'use client';
import Image from 'next/image'
import Button from '../components/ui/buttons/authButton'
import IntraButton from '../components/ui/buttons/intraButton'
import PrimaryButton from '@/components/ui/buttons/primaryButton';
import SecondaryButtom from '@/components/ui/buttons/secondaryButton';
import ToggleSwitch from '@/components/ui/buttons/ToggleSwitch';
import { ThemeProvider } from "@material-tailwind/react";
import SearchInput from '@/components/ui/inputs/searchInput';
import UserInput from '@/components/ui/inputs/userInput';

export default function Home() {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-RhinoBlue">
      <div className="flex flex-col items-center  justify-around  min-h-screen">
        <UserInput 
          label="Username"
          placeholder="Enter your username"
          isError={false}
          isDisabled={false}
          type='text'
          lableColor='#23336C'
          width='sm'
        />
    </div>
    
    </main>
  )
}
