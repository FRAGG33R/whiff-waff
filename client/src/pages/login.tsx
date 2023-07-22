'use client';

import "../app/globals.css";
import NotificationDropDown from "@/components/ui/dropDowns/notificationDropDown";
import MessageDropDown from "@/components/ui/dropDowns/messageDropDown"; 
import MuteDropDown from "@/components/ui/dropDowns/muteDropDown";
import UserChannelDropDown from "@/components/ui/dropDowns/userChannelDropDown";
import ProfilDropDown from "@/components/ui/dropDowns/profilDropDown";

export default function Login() {
  // const notifications = [
  //   {id: 1, src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80", 
  //   name: "John Doe", 
  //   message: "added you to an event in best friends",
  //   time: "2m"},
  //   {id: 2, src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80", 
  //   name: "Hassan", 
  //   message: "wach akhona", 
  //   time: "1h"},
  
  //   {id: 3, src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80", 
  //   name: "Kamal", 
  //   message: "nla3bo", 
  //   time: "2h"},
    
  // ];
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center overflow-x-hidden  text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <UserChannelDropDown
        // notifications={notifications}
        // content={notifications.length}
       />
    </div>
  );
}
