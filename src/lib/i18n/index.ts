import en from "./en";
import es from "./es";
import type { Dictionary } from "./en";

export type Locale = "en" | "es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export type { Dictionary };
