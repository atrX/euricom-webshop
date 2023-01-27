import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { TRPCClientError } from "@trpc/client";

import { api } from "../utils/api";

import "../styles/globals.css";
import NavBar from "../components/NavBar";
import DialogProvider from "../components/DialogProvider";
import ToastProvider from "../components/ToastProvider";
import { eventBus } from "../utils/event-bus";
import { type ReactNode, useEffect } from "react";
import { useToast } from "../utils/use-toast";

const AppProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  useEffect(() => {
    function errorCallback(error: unknown) {
      if (error instanceof TRPCClientError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        showToast(error.shape?.message);
      }
    }

    eventBus.on("mutation-error", errorCallback);
    eventBus.on("query-error", errorCallback);

    return () => {
      eventBus.off("mutation-error", errorCallback);
      eventBus.off("query-error", errorCallback);
    };
  }, [showToast]);

  return <>{children}</>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <DialogProvider>
        <ToastProvider>
          <AppProvider>
            <NavBar />
            <div className="p-4">
              <Component {...pageProps} />
            </div>
          </AppProvider>
        </ToastProvider>
      </DialogProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
