import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "@/app/globals.css";
import { SocketProvider } from "@/context/socket";

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
      <RecoilRoot>
          <Component {...pageProps} />
      </RecoilRoot>
  );
};

export default MyApp;
