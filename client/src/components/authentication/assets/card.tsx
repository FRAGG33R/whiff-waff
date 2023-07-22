import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import UserInput from "@/components/ui/inputs/userInput";
import { useState } from "react";
import AuthButton from "@/components/ui/buttons/authButton";
import IntraButton from "@/components/ui/buttons/intraButton";
import { useRouter } from "next/router";

export default function Card(props : {Mode : "signin" | "signup"}) {
	const router = useRouter();
	const [fullname, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [step, setStep] = useState(0);

	const signinArray = [
		{
			label: "Enter your Email",
			placeholder: "you@yourmail.com",
			value: email,
			setValue: setEmail,
			type: "email",
		},
		{
			label: "Enter your Password",
			placeholder: "*********",
			value: password,
			setValue: setPassword,
			type: "password",
		},
	];
	const signupArray = [
		{
			label: "Enter your Fullname",
			placeholder: "John Doe",
			value: fullname,
			setValue: setFullname,
			type: "text",
		},
		{
			label: "Enter your Username",
			placeholder: "johndoe",
			value: username,
			setValue: setUsername,
			type: "text",
		},
		{
			label: "Enter your Email",
			placeholder: "you@yourmail.com",
			value: email,
			setValue: setEmail,
			type: "email",
		},
		{
			label: "Enter your Password",
			placeholder: "*********",
			value: password,
			setValue: setPassword,
			type: "password",
		},
	];

  const signIn = async () => {
    try {
		router.push("http://e3r8p18.1337.ma:3000/auth/signin/42");
	}
     catch (error) {
      console.log(error);
    }
  };
  const handleNext = () => {
	if (step < (props.Mode === 'signin' ? signinArray.length : signupArray.length) - 1) {
	  setStep((prev) => prev + 1);
	}
	else
	{
		// submit the form
	}
	}

  return (
    <div className="min-h-1 min-w-1 z-10 px-10 md:px-24 md:py-24 py-16 flex items-center justify-center flex-col space-y-16 md:space-y-12 bg-DarkGrey rounded-xl">
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-4">
        <Image src={Logo} alt="Logo" className="w-10/12" />
        <div className="text-3xl font-teko font-bold">{props.Mode === 'signin' ? 'Welcome Back !' : 'Welcome !'}</div>
      </div>
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-8">
     	<UserInput
          label={props.Mode === 'signin' ? signinArray[step].label : signupArray[step].label}
          placeholder={props.Mode === 'signin' ? signinArray[step].placeholder : signupArray[step].placeholder}
          isError={false}
          isDisabled={false}
          lableColor="#222222"
          value={props.Mode === 'signin' ? signinArray[step].value : signupArray[step].value}
		  setValue={props.Mode === 'signin' ? signinArray[step].setValue : signupArray[step].setValue}
          type={props.Mode === 'signin' ? signinArray[step].type : signupArray[step].type}
          width="md"
        />
        <AuthButton text="Continue" onClick={handleNext} />
      </div>
      {props.Mode === 'signin' && <div className="w-full h-full flex items-center justify-center space-y-8 md:space-y-12 flex-col">
        <div className="w-full min-h-1 flex items-center justify-center">
          <div className="w-full border-b-2 border-white"></div>
          <div className="fixed z-10 min-w-1 text-center md:text-2xl text-xl text-white font-teko bg-DarkGrey px-4">
            Staff or student
          </div>
        </div>
        <IntraButton
          text="Login with Intra"
          onClick={() => {
            signIn();
          }}
        />
      </div>}
    </div>
  );
}
