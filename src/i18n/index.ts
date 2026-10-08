import type { Locale } from "../config/site";
import { en, type Dictionary } from "./en";
import { pt } from "./pt";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
