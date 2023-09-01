
import SignUpComponent from "@/components/authentication/signup/signup";
import Wave from "@/components/authentication/assets/wave";
import "../app/globals.css";
import LogintoggleSwitch from "@/components/ui/buttons/loginToggleSwitch";

export default function Signup() {

  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <div className="h-44 w-44 fixed top-0 md:pt-0 pt-2 md:mr-10 mr-0  right-24 md:right-0 flex items-start md:items-end justify-center bg--400">
        <LogintoggleSwitch
          tab="Signup"
          firstValue="Login"
          secondValue="Signup"
        />
      </div>
      <SignUpComponent />
      <Wave />
    </div>
  );
}
