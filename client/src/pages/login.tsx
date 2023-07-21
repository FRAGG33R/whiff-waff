'use client';

import "../app/globals.css";
import SecondaryButton from "@/components/ui/buttons/secondaryButton";
import NotificationDrop from "@/components/ui/dropDowns/notificationDrop";

export default function Login() {
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <NotificationDrop />
    </div>
  );
}
