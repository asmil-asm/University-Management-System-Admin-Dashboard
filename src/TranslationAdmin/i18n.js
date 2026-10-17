import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import en from "./en.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const applyDirection = (lng) => {
  if (typeof document === "undefined") return;

  const isRTL = lng?.startsWith("ar");

  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = lng || "ar";
};

i18n.on("languageChanged", applyDirection);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

applyDirection(i18n.language || "ar");

export default i18n;