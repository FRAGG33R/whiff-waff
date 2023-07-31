import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import UserInput from "@/components/ui/inputs/userInput";
import { useState } from "react";
import AuthButton from "@/components/ui/buttons/authButton";
import IntraButton from "@/components/ui/buttons/intraButton";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";
import { api } from "@/components/axios/instance";
import { motion } from "framer-motion";
import axios from "axios";

export default function Card(props: { Mode: "signin" | "signup" }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const signinArray = [
    {
      label: "Enter your Email",
      placeholder: "you@yourmail.com",
      value: email,
      setValue: setEmail,
      type: "email",
      RegExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Invalid email",
    },
    {
      label: "Enter your Password",
      placeholder: "*********",
      value: password,
      setValue: setPassword,
      type: "password",
      RegExp: /^.{6,}$/,
      errorMessage: "Invalid password",
    },
  ];
  const signupArray = [
    {
      label: "Enter your First name",
      placeholder: "John",
      value: firstName,
      setValue: setFirstName,
      type: "text",
      RegExp: /^.{3,}$/,
      errorMessage: "Invalid first name",
    },
    {
      label: "Enter your Last name",
      placeholder: "doe",
      value: lastName,
      setValue: setLastNam,
      type: "text",
      RegExp: /^.{3,}$/,
      errorMessage: "Invalid last name",
    },
    {
      label: "Enter your Username",
      placeholder: "johndoe",
      value: username,
      setValue: setUsername,
      type: "text",
      RegExp: /^[a-zA-Z0-9_.]{3,16}$/,
      errorMessage: "Invalid username",
    },
    {
      label: "Enter your Email",
      placeholder: "you@yourmail.com",
      value: email,
      setValue: setEmail,
      type: "email",
      RegExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Invalid email",
    },
    {
      label: "Enter your Password",
      placeholder: "*********",
      value: password,
      setValue: setPassword,
      type: "password",
      RegExp: /^.{6,}$/,
      errorMessage: "Invalid password",
    },
  ];
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const signIn = async () => {
	// axios.defaults.withCredentials = true;
    // await axios.get('http://e3r10p16.1337.ma:3000/api/v1/auth/signin/42')
	router.push("http://e3r10p16.1337.ma:3000/api/v1/auth/signin/42/");
  };
  const handleNext = async () => {
    if (
      step <
      (props.Mode === "signin" ? signinArray.length : signupArray.length) - 1
    ) {
      if (
        props.Mode === "signin" &&
        signinArray[step].RegExp.test(signinArray[step].value)
      ) {
        setStep((prev) => prev + 1);
        setError(false);
      } else if (
        props.Mode === "signup" &&
        signupArray[step].RegExp.test(signupArray[step].value)
      ) {
        setStep((prev) => prev + 1);
        setError(false);
      }
	  else {
		setError(true);
		setErrorMessage(props.Mode === "signin" ? signinArray[step].errorMessage : signupArray[step].errorMessage);
	}
    } else {
      if (
        (props.Mode === "signup" &&
          signupArray[step].RegExp.test(signupArray[step].value)) ||
        (props.Mode === "signin" &&
          signinArray[step].RegExp.test(signinArray[step].value))
      ) {
        setError(false);
        let req;
        props.Mode === "signin"
          ? (req = {
              email,
              password,
            })
          : (req = {
              firstName,
              lastName,
              userName: username,
              email,
              password,
            });
        try {
		  setNeedsVerification(false);
          const res = await api.post(`auth/${props.Mode}/`, req);
          console.log(res.data);
          const { statusCode, token, message } = res.data;

          console.log("status code : ", statusCode);
          console.log("status code : ", token);
          console.log("message : ", message);
          localStorage.setItem("token", token);
          if (statusCode === 201 && props.Mode === "signup") {
		  	setNeedsVerification((prev) => !prev);
			  setTimeout(() => {
				setNeedsVerification(false);
				router.push("/login")
			  }, 2000);
		  }
        } catch (error : any) {

			if (error.response && error.response.data) {
			const {statusCode, message } = (error as any).response.data;
			console.log("status code : ", statusCode);
			console.log("message : ", message);
			setError(true);
			setErrorMessage(message);
			}
        }
      }
	  else
	  {
		setError(true);
		setErrorMessage(props.Mode === "signin" ? signinArray[step].errorMessage : signupArray[step].errorMessage);
	  }
    }
  };

  return (
    <div className="min-h-1 min-w-1 z-10 px-6 md:px-24 md:py-20 py-6 flex items-center justify-center flex-col space-y-8 md:space-y-16 bg-DarkGrey rounded-xl">
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-4">
        <Image src={Logo} alt="Logo" className="" />
        <div className="text-2xl md:text-3xl font-teko font-bold">
          {props.Mode === "signin" ? "Welcome Back !" : "Welcome !"}
        </div>
      </div>
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-6">
        <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-2">
          <UserInput
            handleKeyDown={handleKeyDown}
            label={
              props.Mode === "signin"
                ? signinArray[step].label
                : signupArray[step].label
            }
            placeholder={
              props.Mode === "signin"
                ? signinArray[step].placeholder
                : signupArray[step].placeholder
            }
            isError={error}
            setError={setError}
            isDisabled={false}
            lableColor="#222222"
            regExp={
              props.Mode === "signin"
                ? signinArray[step].RegExp
                : signupArray[step].RegExp
            }
            value={
              props.Mode === "signin"
                ? signinArray[step].value
                : signupArray[step].value
            }
            setValue={
              props.Mode === "signin"
                ? signinArray[step].setValue
                : signupArray[step].setValue
            }
            type={
              props.Mode === "signin"
                ? signinArray[step].type
                : signupArray[step].type
            }
            width="md"
          />
          {error === true && (
            <p className="text-md text-red-500 font-poppins ">
             {errorMessage}
            </p>
          )}
        </div>
        <AuthButton text="Continue" onClick={handleNext} />
      </div>
     
        {needsVerification && <motion.div
		  initial={{ x: 0 }}
		  style={{ x: 0 }}
		  whileInView={{ x: 60 }}
          className="p-4 mb-4 text-sm md:w-1/3 w-10/12 absolute z-10 bottom-10 -left-10 md:left-0 text-green-800 rounded-lg bg-green-50 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Account created successfully,</span>
          {" "}Please check your email to verify your account.
        </motion.div>}
    
      {props.Mode === "signin" && (
        <div className="w-full h-full flex items-center justify-center space-y-2 md:space-y-6 flex-col">
          <div className="w-full min-h-1 flex items-center justify-center">
            <div className="absolute w-72 md:w-96 border-b-2 border-white"></div>
            <div className="relative  z-10  min-w-1 text-center md:text-2xl text-xl text-white font-teko bg-DarkGrey px-4">
              Staff or student
            </div>
          </div>
          <IntraButton
            text="Login with Intra"
            onClick={() => {
              signIn();
            }}
          />
        </div>
      )}
    </div>
  );
}
