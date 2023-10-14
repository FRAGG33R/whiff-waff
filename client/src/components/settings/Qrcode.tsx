import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { api } from "../axios/instance";
import { useRecoilState } from "recoil";
import { userType } from "@/types/userType";
import { userAtom } from "@/context/RecoilAtoms";
import Image from "next/image";



const QRCodeGenerator = () => {
  const [qrSize, setQRSize] = useState(180);
  const [user, setUser] = useRecoilState(userAtom);
  const [userState, setUserState] = useState<userType>(user as userType);
  const [avatar, setAvatar] = useState<string>("");

  let jwtToken: string | null = null;

  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("token");
  }
  const updateQRCodeSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1536) {
        setQRSize(320); 
    } else if (screenWidth >= 1280) {
        setQRSize(260); 
    } else if (screenWidth >= 1024) {
        setQRSize(200); 
    } else if (screenWidth >= 768) {
        setQRSize(180); 
    } else if (screenWidth >= 640) {
        setQRSize(150); 
    } else {
        setQRSize(120); 
    }
};

  const fetchCode = async () => {
   try{
    const res = await api.get("auth/generate-2fa/" + (userState as userType).userName, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setAvatar(res.data);
  } 
    catch(error){
    }
  };
  useEffect(() => {
    fetchCode();
    updateQRCodeSize(); 
    window.addEventListener("resize", updateQRCodeSize);

    return () => {
      window.removeEventListener("resize", updateQRCodeSize);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "300%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        display: "inline-block"
      }}
    >
      <img src={avatar} alt="avatar" width={qrSize} height={qrSize} />
    </div>
  );
};

export default QRCodeGenerator;

