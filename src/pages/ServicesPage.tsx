import { useLanguage } from "../context/useLanguage";
import type { MessageKey } from "../i18n/translations";

interface Service {
  id: number;
  icon: string;
  name: MessageKey;
  desc: MessageKey;
  price: number;
}

const SERVICES: Service[] = [
  { id: 1, icon: "💻", name: "service.web.name", desc: "service.web.desc", price: 50000 },
  { id: 2, icon: "📱", name: "service.app.name", desc: "service.app.desc", price: 120000 },
  { id: 3, icon: "🎨", name: "service.design.name", desc: "service.design.desc", price: 25000 },
];

export default function ServicesPage() {
  const { t, formatCurrency, formatNumber } = useLanguage();

  return (
    <div>
      <h1>{t("services.title")}</h1>
      <p className="muted">{t("services.subtitle")}</p>
      <p className="count">
        {t("services.count", { count: formatNumber(SERVICES.length) })}
      </p>

      <div className="grid">
        {SERVICES.map((s) => (
          <div key={s.id} className="card">
            <div className="card-icon">{s.icon}</div>
            <h3>{t(s.name)}</h3>
            <p className="muted">{t(s.desc)}</p>
            <p className="price">
              {t("services.from", { price: formatCurrency(s.price) })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}