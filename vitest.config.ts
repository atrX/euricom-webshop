import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
  resolve: {
    alias: {
      // fixes vitest not recognizing fs module
      // no clue why it suddenly broke out of nowhere
      // was working fine the day before and then stopped working without any changes...
      fs: require.resolve("rollup-plugin-node-builtins"),
    },
  },
});
