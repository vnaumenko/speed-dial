export const getDate = (timeZone: string) =>
  new Date().toLocaleDateString("ru-RU", {
    timeZone,
    dateStyle: "full",
  });

export const getTime = (timeZone: string) => new Date().toLocaleTimeString("ru-RU", { timeZone });

export const getHumanTimeZone = (timeZone: string) =>
  timeZone
    .substring(timeZone.indexOf("/") + 1)
    .replaceAll("_", " ")
    .replaceAll("/", " / ");
