import { useLanguage } from "../context/useLanguage";
import type { MessageKey } from "../i18n/translations";

interface Props {
  icon: string;
  titleKey: MessageKey;
  descKey: MessageKey;
}

// Parent se language pass nahi hui: card khud useLanguage() se text leta hai
export default function FeatureCard({ icon, titleKey, descKey }: Props) {
  const { t } = useLanguage();

  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3>{t(titleKey)}</h3>
      <p className="muted">{t(descKey)}</p>
    </div>
  );
}