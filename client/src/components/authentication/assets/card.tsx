import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import UserInput from "@/components/ui/inputs/userInput";
import { useState, useEffect } from "react";
import AuthButton from "@/components/ui/buttons/authButton";
import IntraButton from "@/components/ui/buttons/intraButton";

export default function Card() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-1 min-w-1 z-10 px-6 md:px-24 py-14 flex items-center justify-center flex-col space-y-16 md:space-y-12 bg-DarkGrey rounded-xl">
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-4">
        <Image src={Logo} alt="Logo" className="w-10/12" />
        <div className="text-3xl font-teko font-bold">Welcome Back !</div>
      </div>
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-8">
        <UserInput
          label="Enter your Email"
          placeholder="you@yourmail.com"
          isError={false}
          isDisabled={false}
          lableColor="#222222"
          value={email}
          setValue={setEmail}
          type="email"
          width="md"
        />
        <AuthButton text="Continue" onClick={() => {}} />
      </div>
      <div className="w-full h-full flex items-center justify-center space-y-8 md:space-y-12 flex-col">
        <div className="w-full min-h-1 flex items-center justify-center">
          <div className="w-full border-b-2 border-white"></div>
          <div className="fixed z-10 min-w-1 text-center md:text-2xl text-xl text-white font-teko bg-DarkGrey px-4">
            Staff or student
          </div>
        </div>
		<IntraButton text="Login with Intra" onClick={() => {}} />
      </div>
    </div>
  );
}
