import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import NavBar from "../components/NavBar";
import DialogProvider from "../components/DialogProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <DialogProvider>
        <NavBar />
        <div className="p-4">
          <Component {...pageProps} />
        </div>
      </DialogProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
