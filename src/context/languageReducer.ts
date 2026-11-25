import type { Language } from "../i18n/translations";

export interface LanguageState {
  language: Language;
}

export const initialLanguageState: LanguageState = { language: "en" };

// Actions: har action ek object hai jis mein "type" hota hai
export type LanguageAction =
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "TOGGLE_LANGUAGE" }
  | { type: "HYDRATE"; payload: Language }; // dusre tab se sync ke liye

export function languageReducer(
  state: LanguageState,
  action: LanguageAction
): LanguageState {
  switch (action.type) {
    case "SET_LANGUAGE":
    case "HYDRATE":
      // Same language ho to wahi state do, taake bekar re-render na ho
      if (state.language === action.payload) return state;
      return { language: action.payload };

    case "TOGGLE_LANGUAGE":
      return { language: state.language === "en" ? "ur" : "en" };

    default:
      return state;
  }
}