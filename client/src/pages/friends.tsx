import "../app/globals.css";

import FriendsPage from "@/components/friends/friendsPage";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Friends() {
  const router = useRouter();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <FriendsPage />
    </div>
  );
}
