import { useLanguage } from "../context/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label={t("lang.label")}>
      <button
        type="button"
        lang="en"
        className={language === "en" ? "active" : ""}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        English
      </button>
      <button
        type="button"
        lang="ur"
        className={language === "ur" ? "active" : ""}
        aria-pressed={language === "ur"}
        onClick={() => setLanguage("ur")}
      >
        اردو
      </button>
    </div>
  );
}