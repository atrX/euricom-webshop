import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import { render as renderRtl } from "@testing-library/react";
import type { Session } from "next-auth";
import type { NextRouter } from "next/router";
import {
  type FC,
  useState,
  type ReactNode,
  type ReactElement,
  type JSXElementConstructor,
  cloneElement,
} from "react";
import superjson from "superjson";
import DialogProvider from "../src/components/DialogProvider";
import ToastProvider from "../src/components/ToastProvider";
import type { AppRouter } from "../src/server/api/root";
import { fetch } from "cross-fetch";
import { SessionProvider } from "next-auth/react";

export * from "@testing-library/react";

export type DefaultParams = Parameters<typeof renderRtl>;
export type RenderUI = DefaultParams[0];
export type RenderOptions<T extends FC> = DefaultParams[1] & {
  router?: Partial<NextRouter> | undefined;
  session?: Session | null;
  initialProps?: T["propTypes"];
};

const trpc = createTRPCReact<AppRouter>();

export function useClients() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: () => false,
        }),
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          fetch(url, opts) {
            return fetch(url, {
              ...opts,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return { trpcClient, queryClient };
}

const ProviderPageProps = {
  cookies: "string",
  session: null,
};

function createWrapper<T extends FC>(options: RenderOptions<T> = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    const { queryClient, trpcClient } = useClients();
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider
            session={options.session ?? ProviderPageProps.session}
            refetchInterval={5 * 1000}
          >
            <ToastProvider>
              <DialogProvider>{children}</DialogProvider>
            </ToastProvider>
          </SessionProvider>
        </QueryClientProvider>
      </trpc.Provider>
    );
  };
}

export function render<T extends FC>(
  ui: ReactElement<T, string | JSXElementConstructor<T>>,
  {
    router = {},
    session = null,
    initialProps,
    ...options
  }: RenderOptions<T> = {}
) {
  return renderRtl(cloneElement(ui, initialProps), {
    wrapper: createWrapper({ router, session }),
    ...options,
  });
}

export function toSuperJSON(source: unknown) {
  const jsonString = superjson.stringify(source);
  return JSON.parse(jsonString) as unknown;
}

export function toTRPCResult(source: unknown) {
  return [
    {
      result: {
        data: toSuperJSON(source),
      },
    },
  ];
}
