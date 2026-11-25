import { useState, type FormEvent } from "react";
import { useLanguage } from "../context/useLanguage";
import type { MessageKey } from "../i18n/translations";

export default function ContactPage() {
  const { t } = useLanguage();

  // Sab LOCAL state: form fields sirf is page ke hain
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSentTo(null);

    if (!name.trim()) return setErrorKey("contact.errName");
    if (!email.includes("@") || !email.includes(".")) {
      return setErrorKey("contact.errEmail");
    }
    if (message.trim().length < 10) return setErrorKey("contact.errMessage");

    setErrorKey(null);
    setSentTo(name.trim());
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h1>{t("contact.title")}</h1>

      <label className="field">
        {t("contact.name")}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="field">
        {t("contact.email")}
        <input
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="field">
        {t("contact.message")}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      {errorKey && <p className="form-error">{t(errorKey)}</p>}
      {sentTo && <p className="form-success">{t("contact.sent", { name: sentTo })}</p>}

      <button type="submit" className="btn primary">
        {t("contact.send")}
      </button>
    </form>
  );
}