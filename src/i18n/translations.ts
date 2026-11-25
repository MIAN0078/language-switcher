export type Language = "en" | "ur";

const en = {
  "lang.label": "Change language",

  "nav.home": "Home",
  "nav.services": "Services",
  "nav.contact": "Contact",

  "home.title": "Welcome to LangHub",
  "home.subtitle":
    "One app, two languages. Switch between English and Urdu anytime.",
  "home.nameLabel": "Your name",
  "home.namePlaceholder": "Type your name...",
  "home.guest": "friend",
  "home.greeting": "Hello, {name}!",
  "home.today": "Today: {date}",
  "home.toggle": "Toggle language",
  "home.whyTitle": "How it works",

  "feature.context.title": "Context API",
  "feature.context.desc":
    "The language is shared with every component without passing props.",
  "feature.reducer.title": "useReducer",
  "feature.reducer.desc":
    "Every language change goes through actions and a single reducer.",
  "feature.saved.title": "Saved state",
  "feature.saved.desc":
    "Your choice is stored and restored when you refresh the page.",

  "services.title": "Our Services",
  "services.subtitle": "Simple pricing for every project.",
  "services.from": "From {price}",
  "services.count": "{count} services available",
  "service.web.name": "Web Development",
  "service.web.desc": "Fast and responsive websites built with React.",
  "service.app.name": "Mobile Apps",
  "service.app.desc": "Apps that work smoothly on Android and iPhone.",
  "service.design.name": "UI Design",
  "service.design.desc": "Clean and simple designs that people enjoy using.",

  "contact.title": "Contact Us",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Send message",
  "contact.errName": "Please enter your name",
  "contact.errEmail": "Please enter a valid email",
  "contact.errMessage": "Message must be at least 10 characters",
  "contact.sent": "Thank you, {name}! Your message was received (demo only).",
};

// Saari valid keys en se ban jati hain
export type MessageKey = keyof typeof en;
type Messages = Record<MessageKey, string>;

// Agar yahan koi key reh gayi to TypeScript error dega
const ur: Messages = {
  "lang.label": "زبان تبدیل کریں",

  "nav.home": "ہوم",
  "nav.services": "خدمات",
  "nav.contact": "رابطہ",

  "home.title": "لینگ ہب میں خوش آمدید",
  "home.subtitle":
    "ایک ایپ، دو زبانیں۔ جب چاہیں انگریزی اور اردو کے درمیان تبدیل کریں۔",
  "home.nameLabel": "آپ کا نام",
  "home.namePlaceholder": "اپنا نام لکھیں...",
  "home.guest": "دوست",
  "home.greeting": "السلام علیکم، {name}!",
  "home.today": "آج: {date}",
  "home.toggle": "زبان بدلیں",
  "home.whyTitle": "یہ کیسے کام کرتا ہے",

  "feature.context.title": "کانٹیکسٹ اے پی آئی",
  "feature.context.desc":
    "زبان ہر کمپوننٹ کو بغیر props پاس کیے مل جاتی ہے۔",
  "feature.reducer.title": "یوز ریڈیوسر",
  "feature.reducer.desc":
    "زبان کی ہر تبدیلی ایکشنز کے ذریعے ایک ہی ریڈیوسر سے گزرتی ہے۔",
  "feature.saved.title": "محفوظ حالت",
  "feature.saved.desc":
    "آپ کا انتخاب محفوظ ہو جاتا ہے اور صفحہ ریفریش کرنے پر واپس مل جاتا ہے۔",

  "services.title": "ہماری خدمات",
  "services.subtitle": "ہر پروجیکٹ کے لیے سادہ قیمتیں۔",
  "services.from": "ابتدائی قیمت {price}",
  "services.count": "{count} خدمات دستیاب ہیں",
  "service.web.name": "ویب ڈیولپمنٹ",
  "service.web.desc": "ری ایکٹ سے بنی تیز اور ریسپانسو ویب سائٹس۔",
  "service.app.name": "موبائل ایپس",
  "service.app.desc": "اینڈرائیڈ اور آئی فون پر آسانی سے چلنے والی ایپس۔",
  "service.design.name": "یو آئی ڈیزائن",
  "service.design.desc": "صاف اور سادہ ڈیزائن جو استعمال میں اچھے لگیں۔",

  "contact.title": "ہم سے رابطہ کریں",
  "contact.name": "نام",
  "contact.email": "ای میل",
  "contact.message": "پیغام",
  "contact.send": "پیغام بھیجیں",
  "contact.errName": "براہ کرم اپنا نام لکھیں",
  "contact.errEmail": "براہ کرم درست ای میل لکھیں",
  "contact.errMessage": "پیغام کم از کم 10 حروف کا ہونا چاہیے",
  "contact.sent": "شکریہ، {name}! آپ کا پیغام موصول ہو گیا (صرف ڈیمو)۔",
};

export const messages: Record<Language, Messages> = { en, ur };

export type TranslateParams = Record<string, string | number>;

// "Hello, {name}!" + { name: "Ali" } => "Hello, Ali!"
export function translate(
  language: Language,
  key: MessageKey,
  params?: TranslateParams
): string {
  let text = messages[language][key];
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}