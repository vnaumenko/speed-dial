export const getDate = (timeZone: string, locale?: string) =>
  new Date().toLocaleDateString(locale ? `${locale}-${locale.toUpperCase()}` : undefined, {
    timeZone,
    dateStyle: "full",
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

export const getTimeZones = () =>
  Intl.supportedValuesOf("timeZone")
    .map((timeZone) => {
      return [timeZone, getHumanTimeZone(timeZone)];
    })
    .toSorted((timeZoneA, timeZoneB) => timeZoneA[1].localeCompare(timeZoneB[1]));
