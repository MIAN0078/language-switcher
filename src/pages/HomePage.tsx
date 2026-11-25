import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import { useLanguage } from "../context/useLanguage";

export default function HomePage() {
  const { t, toggleLanguage, formatDate } = useLanguage();

  // LOCAL state: sirf is page ko chahiye
  const [name, setName] = useState("");
  const [today] = useState(() => new Date());

  return (
    <div>
      <section className="hero">
        <h1>{t("home.title")}</h1>
        <p className="muted big">{t("home.subtitle")}</p>

        <label className="field">
          {t("home.nameLabel")}
          <input
            value={name}
            placeholder={t("home.namePlaceholder")}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <p className="greeting">
          {t("home.greeting", { name: name.trim() || t("home.guest") })}
        </p>
        <p className="muted">{t("home.today", { date: formatDate(today) })}</p>

        <button className="btn primary" onClick={toggleLanguage}>
          {t("home.toggle")}
        </button>
      </section>

      <h2>{t("home.whyTitle")}</h2>
      <div className="grid">
        <FeatureCard
          icon="🌍"
          titleKey="feature.context.title"
          descKey="feature.context.desc"
        />
        <FeatureCard
          icon="⚙️"
          titleKey="feature.reducer.title"
          descKey="feature.reducer.desc"
        />
        <FeatureCard
          icon="💾"
          titleKey="feature.saved.title"
          descKey="feature.saved.desc"
        />
      </div>
    </div>
  );
}