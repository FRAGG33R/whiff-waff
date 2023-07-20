'use client';

import "../app/globals.css";
import PrimaryButton from "@/components/ui/buttons/primaryButton";

export default function Login() {
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-black">
	  <div className="text-4xl">This is the log in page</div>
        <PrimaryButton text="Log in" />     
    </div>
  );
}
