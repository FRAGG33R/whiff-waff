import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import UserInput from "@/components/ui/inputs/userInput";
import { useState } from "react";
import AuthButton from "@/components/ui/buttons/authButton";
import IntraButton from "@/components/ui/buttons/intraButton";
import { useRouter } from "next/router";
import axios from "axios";
 
export default function Card(props: { Mode: "signin" | "signup" }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
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

  const signIn = async () => {
   router.push("http://e1r12p4.1337.ma:3001/api/v1/auth/signin/42/");
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
      } else setError(true);
    } else {
      if (
        (props.Mode === "signup" &&
          signupArray[step].RegExp.test(signupArray[step].value)) ||
        (props.Mode === "signin" &&
          signinArray[step].RegExp.test(signinArray[step].value))
      ) {
        setError(false);
        let req;
        props.Mode === "signin" ? 
          req ={
            email,
            password,
          }
          : req = {
            firstName,
            lastName,
            userName: username,
            email,
            password,
          }
        try {
          const res = await axios.post(`http://e1r12p4.1337.ma:3001/api/v1/auth/${props.Mode}/`, req);
          console.log(res);
          console.log(res.data);
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);
          router.push("/settings");
        }
        catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="min-h-1 min-w-1 z-10 px-10 md:px-24 md:py-20 py-6 flex items-center justify-center flex-col space-y-16 md:space-y-12 bg-DarkGrey rounded-xl">
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-4">
        <Image src={Logo} alt="Logo" className="w-10/12" />
        <div className="text-3xl font-teko font-bold">
          {props.Mode === "signin" ? "Welcome Back !" : "Welcome !"}
        </div>
      </div>
      <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-6">
        <div className="min-w-1 min-h-1 flex items-center justify-center flex-col space-y-2">
          <UserInput
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
            lableColor="bg-[#222222]"
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
         {error === true &&  <p className="text-md text-red-500 font-poppins ">
            {props.Mode === "signin"
              ? signinArray[step].errorMessage
              : signupArray[step].errorMessage}
          </p>}
        </div>
        <AuthButton text="Continue" onClick={handleNext} />
      </div>
      {props.Mode === "signin" && (
        <div className="w-full h-full flex items-center justify-center space-y-8 md:space-y-12 flex-col">
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
