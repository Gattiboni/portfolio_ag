// @ts-check
import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    // Same folders as .prettierignore.
    ignores: ["dist/", ".astro/", "node_modules/", "legacy/", "assets-src/"],
  },
  js.configs.recommended,
  tseslint.configs.strict,
  eslintPluginAstro.configs.recommended,
);
