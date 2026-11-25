import { createContext } from "react";
import type {
  Language,
  MessageKey,
  TranslateParams,
} from "../i18n/translations";

export type Direction = "ltr" | "rtl";

export interface LanguageContextValue {
  language: Language;
  dir: Direction;
  t: (key: MessageKey, params?: TranslateParams) => string;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  formatNumber: (n: number) => string;
  formatCurrency: (n: number) => string;
  formatDate: (d: Date) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);