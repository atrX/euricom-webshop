import { loadEnvConfig } from "@next/env";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { fetch } from "cross-fetch";
import { server } from "./msw";

loadEnvConfig(process.cwd());
expect.extend(matchers);
global.fetch = fetch; // polyfill fetch

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
