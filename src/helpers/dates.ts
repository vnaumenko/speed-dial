export const getDate = (timeZone: string, locale?: string) =>
  new Date().toLocaleDateString(locale ? `${locale}-${locale.toUpperCase()}` : undefined, {
    timeZone,
    dateStyle: "long",
  });

export const getWeekDay = (timeZone: string, locale?: string) =>
  new Date().toLocaleDateString(locale ? `${locale}-${locale.toUpperCase()}` : undefined, {
    timeZone,
    weekday: "long",
  });

export const getTime = (timeZone: string, locale?: string) =>
  new Date().toLocaleTimeString(locale ? `${locale}-${locale.toUpperCase()}` : undefined, {
    timeZone,
  });

export const getHumanTimeZone = (timeZone: string) =>
  timeZone
    .substring(timeZone.indexOf("/") + 1)
    .replaceAll("_", " ")
    .replaceAll("/", " / ");

export const getTimeZones = () => {
  const timeZones = new Map<string, string>();

  for (const timeZone of Intl.supportedValuesOf("timeZone")) {
    timeZones.set(timeZone, getHumanTimeZone(timeZone));
  }

  return timeZones;
};
