import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { ru } from "@/langs/locales/ru";
import { en } from "@/langs/locales/en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "lang",
      htmlTag: document.documentElement,
      convertDetectedLanguage: "Iso15897",
    },
    fallbackLng: "en",
    resources: {
      en,
      ru,
    },
    supportedLngs: ["en", "ru"],
    defaultNS: "translation",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export { i18n };
