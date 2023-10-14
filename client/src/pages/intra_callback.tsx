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
	  const token = authRes.data.token.token;
      if (authRes.status === 201) {
        localStorage.setItem("token", token);
        const res = await localApi.post("/saveToken", { token });
		const userName = parseJwt(token).user;
        router.push(`/profile/${userName}`);
      }
    } catch (err) {
      localStorage.removeItem("token");
	  router.push("/login");
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
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
		<span className="loading loading-dots w-10 h-10 md:w-16 md:h-16 text-GreenishYellow"></span>
    </div>
  );
}
