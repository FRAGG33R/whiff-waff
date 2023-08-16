import { useEffect, useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";
import { api, localApi } from "@/components/axios/instance";
import { parseJwt } from "@/lib/parseJwt";

export default function IntraCallback() {
  const router = useRouter();
  const { code } = router.query;

  const intraAuth = async () => {
    try {
      const authRes = await api.get(`/auth/signin/42?code=${code}`);
      if (authRes.status === 201) {
        localStorage.setItem("token", authRes.data.token);
        await localApi.post("/saveToken", { token: authRes.data.token });
        router.push(`/profile/${parseJwt(authRes.data.token).userName}`);
      }
    } catch (err) {
      console.log("err");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!code) return;
    intraAuth();
  }, [code]);
  return (
    <div className="w-screen h-screen flex items-center justify-center text-black font-extrabold font-teko text-7xl">
      Waiting
    </div>
  );
}
