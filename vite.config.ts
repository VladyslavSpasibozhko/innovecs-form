/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@libs": path.resolve(__dirname, "./src/libs"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/hooks/**/*.[tj]s?(x)",
        "src/components/**/*.[tj]s?(x)",
        "!src/**/*.spec.[tj]s?(x)",
      ],
    },
  },
});
