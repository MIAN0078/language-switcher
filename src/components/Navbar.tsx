import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          🌐 LangHub
        </Link>

        <nav>
          <NavLink to="/" end>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/services">{t("nav.services")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}