// Карта соответствия языков i18next и локалей для Intl API
export const languageToLocaleMap: Record<string, string> = {
  // Основные языки
  en: "en-US",
  ru: "ru-RU",
  "zh-cn": "zh-CN",
  es: "es-ES",
  hi: "hi-IN",
  ar: "ar-SA",
  pt: "pt-BR",
  bn: "bn-BD",
  fr: "fr-FR",
  ja: "ja-JP",
  de: "de-DE",
};

/**
 * Получает правильную локаль для Intl API на основе языка i18next
 * @param language - язык из i18next (например, 'en', 'ru', 'zh-cn')
 * @returns правильная локаль для Intl API (например, 'en-US', 'ru-RU', 'zh-CN')
 */
export const getLocaleFromLanguage = (language?: string): string | undefined =>
  language ? languageToLocaleMap[language] : undefined;
