import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
    globals: true,
    setupFiles: ["vitest-setup.js"],
    exclude: [...configDefaults.exclude, "./tests/*"],
  },
});
