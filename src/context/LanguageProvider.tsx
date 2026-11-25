import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext";
import {
  initialLanguageState,
  languageReducer,
  type LanguageState,
} from "./languageReducer";
import { translate, type Language } from "../i18n/translations";

const STORAGE_KEY = "langhub.lang.v1";

function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "ur";
}

function readSaved(): Language | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

// Lazy initializer: sirf pehli baar chalta hai
function loadLanguage(fallback: LanguageState): LanguageState {
  const saved = readSaved();
  if (saved) return { language: saved };

  // Pehli baar: browser Urdu ho to Urdu, warna English
  const browserIsUrdu = navigator.language.toLowerCase().startsWith("ur");
  return browserIsUrdu ? { language: "ur" } : fallback;
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    languageReducer,
    initialLanguageState,
    loadLanguage
  );
  const { language } = state;
  const dir = language === "ur" ? "rtl" : "ltr";

  // <html lang dir> set karo. useLayoutEffect paint se pehle chalta hai,
  // is liye refresh pe direction ki jhalak (flicker) nahi aati.
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  // Save: language badle to localStorage mein likho
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* private mode: app phir bhi chalti hai */
    }
  }, [language]);

  // Sync: dusre tab mein language badle to yahan bhi badle
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && isLanguage(e.newValue)) {
        dispatch({ type: "HYDRATE", payload: e.newValue });
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // dispatch stable hota hai, isliye yeh functions bhi stable rehte hain
  const setLanguage = useCallback(
    (next: Language) => dispatch({ type: "SET_LANGUAGE", payload: next }),
    []
  );
  const toggleLanguage = useCallback(
    () => dispatch({ type: "TOGGLE_LANGUAGE" }),
    []
  );

  // useMemo: language na badle to consumers ko naya object nahi milta
  const value = useMemo<LanguageContextValue>(() => {
    const locale = language === "ur" ? "ur-PK" : "en-US";
    const numberFmt = new Intl.NumberFormat(locale);
    const currencyFmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    });
    const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

    return {
      language,
      dir,
      t: (key, params) => translate(language, key, params),
      setLanguage,
      toggleLanguage,
      formatNumber: (n) => numberFmt.format(n),
      formatCurrency: (n) => currencyFmt.format(n),
      formatDate: (d) => dateFmt.format(d),
    };
  }, [language, dir, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}