import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "../styles/global.css";

// https://nextjs.org/docs/basic-features/layouts#with-typescript
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      {getLayout(<Component {...pageProps} />)}
    </UserProvider>
  );
}
