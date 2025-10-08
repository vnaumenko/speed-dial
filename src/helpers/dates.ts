import { getLocaleFromLanguage } from "./locales";

export const getDateWeekDay = (timeZone: string, language?: string) =>
  new Date().toLocaleDateString(getLocaleFromLanguage(language), {
    timeZone,
    dateStyle: "full",
  });

export const getTime = (timeZone: string, language?: string) =>
  new Date().toLocaleTimeString(getLocaleFromLanguage(language), {
    timeZone,
    timeStyle: "short",
  });

export const getHumanTimeZone = (timeZone: string) =>
  timeZone
    .substring(timeZone.indexOf("/") + 1)
    .replaceAll("_", " ")
    .replaceAll("/", " / ");
