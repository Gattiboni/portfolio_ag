import { defineConfig } from "astro/config";
import { site } from "./src/config/site";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Single source of truth for the canonical origin: src/config/site.ts
  site: site.url,
  i18n: {
    locales: [...site.locales],
    defaultLocale: site.defaultLocale,
    routing: {
      // English at "/", Portuguese at "/pt/" (D004).
      prefixDefaultLocale: false,
    },
  },
});
