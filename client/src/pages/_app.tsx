import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useContext, createContext, useState } from 'react';
import '@/app/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  );
};

export default MyApp;
