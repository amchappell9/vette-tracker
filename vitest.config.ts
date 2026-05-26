import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  oxc: false,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    clearMocks: true,
    environment: "jsdom",
    exclude: ["node_modules", ".next", "coverage", "tests/**/*.spec.ts"],
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/vitest/setupTests.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "**/*.d.ts",
        "out/**",
        ".next/**",
        "*.config.js",
        "coverage/**",
      ],
    },
  },
});
