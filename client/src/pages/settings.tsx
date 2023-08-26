import "../app/globals.css";
import SettingPage from "@/components/settings/settingPage";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import {   useRecoilState } from "recoil";
import { userDataAtom} from "../atom/atomStateuser";


export default function Settings(props: any) {
  
  const [userData, setUserData] = useRecoilState(userDataAtom);
	setUserData(props.data.response.user);
  console.log("props: ", props);
  console.log("userData: ", userData);

  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <SettingPage />
    </div>
  );
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {
    
    try {

      const token = await req.session.token.token;
      console.log("token: ", token);


      const res = await axios.get(" http://34.173.232.127/api/v1/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res: ", res.data);
      return {
        props: { data: res.data },
      };
    } catch (error) {
      console.log(error);
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    }
  } ,
  {
    cookieName: "token",
    password:"Lo7s8sidjlsmiwpamsldldl851KWH@#$O852",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);