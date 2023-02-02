import { loadEnvConfig } from "@next/env";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { cleanup } from "./test-utils";
import matchers from "@testing-library/jest-dom/matchers";
import { fetch } from "cross-fetch";
import { server } from "./msw";

// stop logging next info
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.info = () => {};
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
