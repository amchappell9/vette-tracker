import nextVitals from "eslint-config-next/core-web-vitals";
import queryPlugin from "@tanstack/eslint-plugin-query";

const eslintConfig = [
  { ignores: ["coverage/**", "playwright-report/**", "test-results/**"] },
  ...nextVitals,
  ...queryPlugin.configs["flat/recommended"],
];

export default eslintConfig;
