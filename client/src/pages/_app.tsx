import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SocketProvider } from "@/context/socket";
import "@/app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <RecoilRoot>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </RecoilRoot>
  );
};

export default MyApp;
