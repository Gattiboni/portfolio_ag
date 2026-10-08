// Contact details and external links. Components read from here and never
// hard-code these values (D010).

export type Locale = "en" | "pt";

export interface SiteConfig {
  readonly name: string;
  readonly url: string;
  readonly email: string;
  readonly linkedin: string;
  readonly github: string;
  // This site's source, linked from the footer.
  readonly repository: string;
  readonly whatsapp: string;
  readonly locales: readonly Locale[];
  readonly defaultLocale: Locale;
}

export const site = {
  name: "Alan Gattiboni",
  url: "https://portfolio.alangattiboni.site",
  email: "alangattiboni@gmail.com",
  linkedin: "https://www.linkedin.com/in/alangattiboni",
  github: "https://github.com/Gattiboni",
  repository: "https://github.com/Gattiboni/portfolio_ag",
  whatsapp: "https://wa.me/5511983340447",
  locales: ["en", "pt"],
  defaultLocale: "en",
} as const satisfies SiteConfig;
