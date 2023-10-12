import { useEffect } from "react";
import { useRouter } from "next/router";
import { api, localApi } from "@/components/axios/instance";
import { parseJwt } from "@/lib/parseJwt";
import "../app/globals.css";

export default function IntraCallback() {
  const router = useRouter();
  const { code } = router.query;

  const intraAuth = async () => {
    try {
      const authRes = await api.get(`/auth/signin/42?code=${code}`);
      if (authRes.status === 201) {
        localStorage.setItem("token", authRes.data.token);
        const res = await localApi.post("/saveToken", { token: authRes.data.token });
		const userName = parseJwt(authRes.data.token).user;
        router.push(`/profile/${userName}`);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (!code) {
	  router.push("/login");
	  return ;
	}
    intraAuth();
  }, [code]);
  
  return (
    <div className="w-screen h-screen flex items-center justify-center text-black font-extrabold font-teko text-7xl">
      Waiting
    </div>
  );
}
