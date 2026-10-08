import { site, type Locale } from "../config/site";

// Route of the deep-dive page inside each locale. Same segment in both
// languages, as with the home page's anchors.
export const DEEP_DIVE_PATH = "central-de-dados/";

// The part of a URL path that follows the locale prefix: "" for a home page,
// "central-de-dados/" for the deep dive. Lets the head, the language switch
// and the first-visit redirect point at the same page in the other locale.
export function pathWithinLocale(pathname: string, locale: Locale): string {
  const prefix = locale === site.defaultLocale ? "/" : `/${locale}/`;
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) : "";
}
