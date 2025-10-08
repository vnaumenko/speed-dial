import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { ar } from "@/langs/locales/ar";
import { bn } from "@/langs/locales/bn";
import { de } from "@/langs/locales/de";
import { en } from "@/langs/locales/en";
import { es } from "@/langs/locales/es";
import { fr } from "@/langs/locales/fr";
import { hi } from "@/langs/locales/hi";
import { ja } from "@/langs/locales/ja";
import { pt } from "@/langs/locales/pt";
import { ru } from "@/langs/locales/ru";
import { zhCn } from "@/langs/locales/zh-cn";

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
      "zh-cn": zhCn,
      es,
      hi,
      ar,
      pt,
      bn,
      fr,
      ja,
      de,
    },
    supportedLngs: [
      "en",
      "ru",
      "zh-cn",
      "es",
      "hi",
      "ar",
      "pt",
      "bn",
      "fr",
      "ja",
      "de",
    ],
    defaultNS: "translation",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
