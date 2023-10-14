import SignInComponent from "@/components/authentication/signin/signin";
import LogintoggleSwitch from "@/components/ui/buttons/loginToggleSwitch";
import Wave from "@/components/authentication/assets/wave";
import "../app/globals.css";

export default function Login() {

  return (
    <div className="flex h-screen items-center justify-start text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet overflow-y-hidden">
      <div className="h-44 w-44 fixed top-0 md:pt-0 pt-2 md:mr-10 mr-0 right-24 md:right-0 flex items-start md:items-end justify-center bg--400">
        <LogintoggleSwitch
          tab="Login"
          firstValue="Login"
          secondValue="Signup"
        />
      </div>
      <SignInComponent />
      <Wave />
    </div>
  );
}