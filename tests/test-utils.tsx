import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as renderRtl } from "@testing-library/react";
import {
  cloneElement,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import DialogProvider from "../src/components/DialogProvider";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      error: () => {},
    },
  });

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => (
    <DialogProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DialogProvider>
  );
};

export function render<T extends FC>(
  ui: ReactElement<T>,
  props: T["propTypes"] = {}
) {
  return renderRtl(cloneElement(ui, props), {
    wrapper: createWrapper(),
  });
}