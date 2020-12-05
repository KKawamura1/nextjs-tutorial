import React from "react";
import type { AppProps } from "next/app";
// @ts-ignore
import "../styles/global.scss"

const App = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps}/>
};
export default App;
